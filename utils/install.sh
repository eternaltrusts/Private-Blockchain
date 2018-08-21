
# npm install -g pm2 composer-cli@0.20 composer-rest-server@0.20

mkdir fabric-dev-servers && cd fabric-dev-servers

curl -O https://raw.githubusercontent.com/hyperledger/composer-tools/master/packages/fabric-dev-servers/fabric-dev-servers.tar.gz
tar -xvf fabric-dev-servers.tar.gz

# cd ~/fabric-dev-servers
export FABRIC_VERSION=hlfv12
sudo ./downloadFabric.sh
