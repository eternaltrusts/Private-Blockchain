
Feature: Sample

    Background:
        Given I have deployed the business network definition ..
        And I have added the following participants of type com.eternaltrusts.privatenetwork.SampleParticipant
            | participantId   | firstName | lastName |
            | alice@email.com | Alice     | A        |
            | bob@email.com   | Bob       | B        |
        And I have added the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 10    |
            | 2       | bob@email.com   | 20    |
        And I have issued the participant com.eternaltrusts.privatenetwork.SampleParticipant#alice@email.com with the identity alice1
        And I have issued the participant com.eternaltrusts.privatenetwork.SampleParticipant#bob@email.com with the identity bob1

    Scenario: Alice can read all of the assets
        When I use the identity alice1
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 10    |
            | 2       | bob@email.com   | 20    |

    Scenario: Bob can read all of the assets
        When I use the identity alice1
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 10    |
            | 2       | bob@email.com   | 20    |

    Scenario: Alice can add assets that she owns
        When I use the identity alice1
        And I add the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 3       | alice@email.com | 30    |
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 3       | alice@email.com | 30    |

    Scenario: Alice cannot add assets that Bob owns
        When I use the identity alice1
        And I add the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 3       | bob@email.com   | 30    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can add assets that he owns
        When I use the identity bob1
        And I add the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 4       | bob@email.com   | 40    |
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 4       | bob@email.com   | 40    |

    Scenario: Bob cannot add assets that Alice owns
        When I use the identity bob1
        And I add the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 4       | alice@email.com | 40    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can update her assets
        When I use the identity alice1
        And I update the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 50    |
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 50    |

    Scenario: Alice cannot update Bob's assets
        When I use the identity alice1
        And I update the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 2       | bob@email.com   | 50    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can update his assets
        When I use the identity bob1
        And I update the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner         | value |
            | 2       | bob@email.com | 60    |
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner         | value |
            | 2       | bob@email.com | 60    |

    Scenario: Bob cannot update Alice's assets
        When I use the identity bob1
        And I update the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 60    |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can remove her assets
        When I use the identity alice1
        And I remove the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId |
            | 1       |
        Then I should not have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId |
            | 1       |

    Scenario: Alice cannot remove Bob's assets
        When I use the identity alice1
        And I remove the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId |
            | 2       |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can remove his assets
        When I use the identity bob1
        And I remove the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId |
            | 2       |
        Then I should not have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId |
            | 2       |

    Scenario: Bob cannot remove Alice's assets
        When I use the identity bob1
        And I remove the following asset of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId |
            | 1       |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Alice can submit a transaction for her assets
        When I use the identity alice1
        And I submit the following transaction of type com.eternaltrusts.privatenetwork.SampleTransaction
            | asset | newValue |
            | 1     | 50       |
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner           | value |
            | 1       | alice@email.com | 50    |
        And I should have received the following event of type com.eternaltrusts.privatenetwork.SampleEvent
            | asset   | oldValue | newValue |
            | 1       | 10       | 50       |

    Scenario: Alice cannot submit a transaction for Bob's assets
        When I use the identity alice1
        And I submit the following transaction of type com.eternaltrusts.privatenetwork.SampleTransaction
            | asset | newValue |
            | 2     | 50       |
        Then I should get an error matching /does not have .* access to resource/

    Scenario: Bob can submit a transaction for his assets
        When I use the identity bob1
        And I submit the following transaction of type com.eternaltrusts.privatenetwork.SampleTransaction
            | asset | newValue |
            | 2     | 60       |
        Then I should have the following assets of type com.eternaltrusts.privatenetwork.SampleAsset
            | assetId | owner         | value |
            | 2       | bob@email.com | 60    |
        And I should have received the following event of type com.eternaltrusts.privatenetwork.SampleEvent
            | asset   | oldValue | newValue |
            | 2       | 20       | 60       |

    Scenario: Bob cannot submit a transaction for Alice's assets
        When I use the identity bob1
        And I submit the following transaction of type com.eternaltrusts.privatenetwork.SampleTransaction
            | asset | newValue |
            | 1     | 60       |
        Then I should get an error matching /does not have .* access to resource/
