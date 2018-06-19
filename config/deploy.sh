#! /bin/bash


postToSlack(){
  curl -X POST -H 'Content-type: application/json' --data "{\"text\":\"$1\"}" https://hooks.slack.com/services/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

}

makeEnvVars(){
  cp ./config/.env.$1 ./config/.env.$2

  echo "
  LUME_URL=https://${1}.lume.space
  CMS_URL=https://${1}.cms.lume.space
  API_URL=https://${1}.api.lume.space
  " >> ./config/.env.$2

}

deployApp(){
  cd app
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.$1 -T lume --force
  now alias "${2}lume.space" -t $NOW_TOKEN -T lume
  now alias "${2}cms.lume.space" -t $NOW_TOKEN -T lume
  postToSlack "App is now deployed at https://${2}lume.space."

}

deployApi(){
  cd data-api
  now -e NODE_ENV=production -t $NOW_TOKEN --dotenv=../config/.env.$1 -T lume --force
  now alias "${2}api.lume.space" -t $NOW_TOKEN -T lume
}

deploy(){
  deployApp $1 $2 &
  deployApi $1 $2 &
  wait
}


cd data-api
yarn install
yarn run prep-build
cd ..



echo "Beginning deployment for branch:${TRAVIS_BRANCH}"


if [ $TRAVIS_BRANCH == "master" ]; then

  deploy 'production'


else
  TAG=$(echo $TRAVIS_COMMIT | cut -c1-7)
  makeEnvVars "staging" "$TAG"
  makeEnvVars "staging" "$TRAVIS_BRANCH"
  deploy "$TAG" "$TAG." &
  deploy "$TRAVIS_BRANCH" "$TRAVIS_BRANCH." &
  wait
fi
