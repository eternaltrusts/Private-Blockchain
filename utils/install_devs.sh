curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash

nvm install 9

npm install --unsafe-perm  -g composer-cli


mkdir ~/fabric-dev-servers && cd ~/fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz 


#docker
apt-get update
apt-get install \
    apt-transport-https \
    ca-certificates \
    curl \
    software-properties-common

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

sudo apt-key fingerprint 0EBFCD88

add-apt-repository \
   "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

apt-get update
apt-get install docker-ce

#cd ~/fabric-dev-servers
./downloadFabric.sh


apt isntall docker-compose

npm install --unsafe-perm -g composer-rest-server

./startFabric.sh
./createPeerAdminCard.sh

#start


composer network install --card PeerAdmin@hlfv1 --archiveFile eternaltrusts-private-network@0.0.1.bna

composer network start --networkName eternaltrusts-private-network --networkVersion 0.0.1 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@hlfv1 --file networkadmin.card

composer card import --file networkadmin.card

composer network ping --card admin@eternaltrusts-private-network

#To restart the REST server using the same options, issue the following command:
composer-rest-server -c admin@eternaltrusts-private-network -n never -w true
