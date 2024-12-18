---
title: "History’s Plot Twist: Cinematic genre, diversity, and popularity as the ultimate mirror"
description: "Explore how film diversity and genre complexity reflect and shape global cultural trends through data-driven insights."
button: Discover our data story !
---

*In the world of cinema, movies often do more than entertain—they capture and reflect the 
societal pulse of their time. This project seeks to understand how genre complexity and cast 
diversity in films can serve as mirrors of global events and cultural shifts through ratings. By 
analyzing data from CMU, IMDb, and Wikidata sources, we examine how diverse 
demographic representations and complex genre combinations influence ratings and reveal 
trends that resonate with audiences across different eras and regions. This research is 
motivated by the want to fulfill our beliefs that region and time impact population’s 
perceptions of the media they consume. By viewing films through this lens, filmmakers, 
critics, and enthusiasts alike can better understand cinema’s role as both a reflection and an 
influencer of the world’s shifting social and cultural landscape.*

## Research Questions:  
- How do film ratings vary across regions and genres, and how has this evolved over 
time? 
- What is the influence of cast demographics – ethnicity and gender – on ratings, and do 
these effects differ by region? 
- How have traditional genres blended into complex combinations, and how do regional 
preferences respond to these trends? 
- Can we identify time periods of historical or cultural events that coincide with 
significant rating shifts in movies, and for what cast demographics and cinematic 
subjects? 
- Can we predict which genre and demographic combinations will likely achieve the 
highest ratings in each region?  
- Which regions show the most consistent preferences in terms of genre and actor 
demographics? 


# Introduction (time - genres - countries -----> ratings)


## The World Map

{% include_relative assets/plots/world-map.html %}

## The Movie distribution 1

{% include_relative assets/plots/movie-distribution-all.html %}

## The Movie distribution 2

{% include_relative assets/plots/movie-distribution.html %}

## The Movie Race

<iframe src="{{ '/assets/plots/bar-race.html' | relative_url }}"  style=" height: 110vh; width: 100%; border: none;"></iframe> 

## The Heatmap

<iframe src ="{{ '/assets/plots/heatmap-ratings.html' | relative_url }}" style= " height: 120vh; width: 100%; border:none;"> </iframe>

## Ethnicity 

<iframe src ="{{ '/assets/plots/ethnic-percentages.html' | relative_url }}" style = "height:105vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/in-out.html' | relative_url }}" style = "height:105vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/languages.html' | relative_url }}" style = "height:105vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/historical-events.html' | relative_url }}" style = "height:105vh; width: 100%; border:none;"> </iframe>