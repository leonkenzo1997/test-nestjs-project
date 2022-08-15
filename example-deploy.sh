echo "Deploying Apillz Api"

ssh -i ./apillz.pem ec2-user@3.35.9.111 <<EOF

    echo "=> Pulling build from develop"

    cd apillz-backend

    echo "==========SET UP GIT/Discard unstaged changes in Git local=========="

    sudo git stash save --keep-index --include-untracked

    echo "==========PULL GIT ORIGIN DEVELOP=========="

    sudo git pull ssh://git@gitlab.brickmate.kr:6622/apillz/back-end.git develop

    npm install

    pm2 restart 0

EOF

echo "=> Successful deployment"

exit