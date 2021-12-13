#!/bin/bash

echo -n "Enter a day: "
read DAY

if [[ $DAY -gt 0 ]]
then
  echo "Setting up day."
  touch "d${DAY}.txt"
  cp template.js "sol${DAY}.js"
  subl "sol${DAY}.js" "d${DAY}.txt"
fi