#!/bin/bash
clear
git status
echo
read -p "Commit mensaje? (Ctrl-c para cancelar) " msg
git add .
git commit -m''"$msg"''
git push origin master

