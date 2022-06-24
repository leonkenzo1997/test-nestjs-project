echo "Deploying Apillz Admin"

ssh -i ./apillz.pem ec2-user@3.35.9.111 <<EOF

     echo "=> Pulling build from develop"

    cd admin

    echo "==========SET UP GIT/Discard unstaged changes in Git local=========="

    sudo git stash save --keep-index --include-untracked

    echo "==========PULL GIT ORIGIN DEVELOP=========="

    sudo git pull

    docker-compose up -d --build

EOF

echo "=> Successful deployment"

exit