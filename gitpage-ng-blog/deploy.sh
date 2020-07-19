#!/usr/bin/env sh

# abort on errors
set -e

# build, point base-href to the repo
ng build --prod --base-href "https://beaugogh.github.io/bo/"

# navigate into the build output directory
cd dist

# create 404.html identical to index.html
# hack to make angular app work in github pages
cp index.html 404.html

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:beaugogh/bo.git master:gh-pages

cd -