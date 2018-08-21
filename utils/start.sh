
sudo fabric-dev-servers/startFabric.sh


composer network install --card PeerAdmin@hlfv1 --archiveFile ../eternaltrusts-private-network@0.0.1.bna

composer network start --networkName eternaltrusts-private-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file ../networkadmin.card

composer card import --file ../networkadmin.card

composer network ping --card admin@eternaltrusts-private-network



composer-rest-server -c admin@eternaltrusts-private-network -n never -w true

