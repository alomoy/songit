library(tidyverse)

songs <- read.csv("radio/songs.csv")

View(songs)


library(dplyr)
songs <- songs %>% arrange(album)

write.csv(songs, "radio/songs.csv", row.names = FALSE, quote = F)
