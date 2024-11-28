library(tidyverse)

songs <- read.csv("radio/songs.csv")

View(songs)

songs <- songs %>% arrange(Song)
