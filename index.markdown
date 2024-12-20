---
title: "Rating Detectives"
description: "Modeling Movie Ratings with Multidimensional Features"
button: Discover our data story!
---

*Movies offer more than entertainment as they are reflections of societal trends and cultural shifts. This project investigates the key features influencing movie ratings, focusing on attributes like release date, country of production, and innovative metrics such as historical proximity scores and Shannon Diversity Indices for ethnicity and gender. We demonstrate that ratings vary significantly across regions and genres, supported by ANOVA and Kruskal-Wallis tests, with notable exceptions being that documentaries and romantic comedies fail to disprove ratings across regions in these genres vary to a statistically significant degree. Temporal trends also reveal significant variations in ratings, though release date alone proves insufficient as a predictive feature, leading to the development of enhanced attributes for analysis. Using a Random Forest model that ensembles 100 individual decision trees, trained on an 80-20 data split and cross-validated with 10 folds, our approach achieves a mean accuracy of 75.26% in predicting movie ratings. Feature importance analysis highlights release date as the most influential predictor, with a Gini Importance score of 0.2456. This model captures the dynamic evolution of movie ratings and offers a reliable framework for analyzing unlabelled films, providing valuable insights into how genre, region, and time shape audience perceptions.*


# The Good, the Bad, and… you guessed it, the Wrangled

Our work relies on data sourced from several unique platforms. General movie features, such as film runtimes, release dates, and similar metadata were collected from the CMU Movie Corpus. Whilst this movie metadata is comprehensive, many attributes lack a significant number of values for the dataset’s contained movies. Movie ratings are also missing from this data source. Hence, we turned to a couple of external sources to populate and expand our data:

1. **IMDb**: “The world's most popular and authoritative source for movie, TV and celebrity content”, IMDb, provides movie ratings sourced from their users in non-commercial data dumps that are publicly available [1]. Whilst these ratings are averaged in an undisclosed manner as to limit voter bias, we consider this the best and largest possible data source to retrieve ratings from. We therefore source this project’s ratings from IMDb.

2. **The Movie Database (TMDB)**: TMDB compiles millions of movies and their metadata tagged by their IMDb ID. Using this data frame, we were able to populate missing movie values for features in the Corpus. As well, the IMDb IDs provided with this dataset allowed correct matching of ratings to movies. These ratings were then added into the Corpus dataset based on title and release date as a unique identifier.

With movies and their metadata compiled, we further tidied up this data by dropping irrelevant attributes, such as movie poster paths, as well as movies missing data for key features, such as their country of production. 

As a tangential point, our interpretation of the country feature is worthwhile explaining. Take, for example, *“Indiana Jones and the Kingdom of the Crystal Skull”*, which was filmed at Yale University, but then also in Brazil and Argentina. Clearly, the Corpus movie’s label of *“United States of America”* is in reference to the movie being produced by an American company and coming from Hollywood. So, the `countries` attribute is from here on out considered a movie's location of production, which we hypothesize will impact the style and content of the movie based on regional differences in ideologies.

To conclude on our extensive data cleaning, we had to consider movies in the Corpus with more than one country label and genre listed. Why care, you might wonder? Because, for accurate rating prediction based on these features, we cannot consider their presence across more than one attribute value. Otherwise, regional and genre-specific rating trends would homogenize, and we would potentially encounter a situation in which we can predict one geographical region of movies perfectly given the exact same movies exist in another region. 

We therefore opted to preserve the ~86% of movies that had solely one country listed. Furthermore, to handle movies with more than one genre, we opted to expand movies to have more than one entry in our dataset but with each row an entry per unique genre the movie has. Our reasoning for this is threefold:

1. Expanding multi-genres instead of choosing one of their listed genres to incorrectly represent all of the other genres allows us to consider their complexity as a useful feature for future work.  
2. Keeping movies across their genres ensures truthful representation of the way ratings are dispersed across genres. Consider if many movies had the multi-genre of being comedies and romance movies. If comedy was then chosen as the genre to represent these movies, all of these movie ratings would go solely to the comedy genre, excluding romance as a contributor to these ratings values.  
3. Expanding movie genres allowed us to identify the most relevant genres for analysis. The original Corpus dataset contains 365 unique genres, varying from single genres to six or more combined genres—an eye-wateringly broad scope for analysis. To cut this number dramatically, we chose the top 20 genres of the expanded movie genres across the Corpus, ultimately resulting in the movies to analyze with genres in: *action, action/adventure, adventure, black-and-white, comedy, crime fiction, documentary, drama, family, horror, indie, musical, mystery, romance, romantic comedy, romantic drama, short, silent, thriller, world cinema*.  

Finally, we manually grouped movies into regions based on their listed countries to reduce the complexity of further analysis from the original 195 possible countries down to 9 regions of interest:  
- North America  
- Central and South America  
- Western Europe  
- Eastern Europe  
- South Africa and Central Africa  
- North Africa and Middle East  
- India  
- Remaining Asia  
- Oceania

# Understanding Movie Production and Ratings Evolution Across Time and Space


{% include_relative assets/plots/world-map.html %}

The journey into understanding movie ratings begins with a global exploration by mapping ratings across countries and tracking their changes over time. Movies in our dataset span the past century and span over the nine regions of our analysis, but the dynamic map below brings clarity to this vast analysis. With just a glance, you can explore how ratings for a specific genre evolve in a region of interest. For instance, comedy ratings in Australia were strikingly stable at a low score of 2 between 1940 and 1970. After this period, ratings soared, fluctuating around an average of 5. In contrast, comedy ratings in other countries during this era were highly erratic, visualized by the flickering map of rating colors during this thirty year interval. These spatial and temporal variations reveal that geography plays a pivotal role in shaping movie ratings, which to us is an early clue that geography has an influence on ratings.


<iframe src="{{ '/assets/plots/bar-race.html' | relative_url }}"  style=" height: 100vh; width: 100%; border: none;"></iframe> 

Beyond geography, movie ratings are clearly tied to the year of their release. Examining the global frequency of movie production across the top 20 genres reveals fascinating trends in line with this observation of ratings. Some genres, like drama, show a steady increase in production over time, perhaps saturating audiences and dampening enthusiasm for similar movies. Yet many genres, including comedy, romance, action, and mystery, show a bimodal production pattern. Peaks emerged prominently between the 1990s and 2000s, coinciding with the technological revolution and the rise of digital media. Another notable peak appears in the 1920s, often associated with the film industry’s resurgence during the post-WWI “Roaring Twenties.” These dual peaks suggest that historical and technological contexts play a crucial role in shaping production trends, which in turn impact ratings. This temporal variation underscores the importance of release dates when analyzing movie ratings, setting the stage for further exploration into time as a key factor in audience reception.


{% include_relative assets/plots/movie-distribution.html %}

Having a basic intuition of movie ratings being dynamic and spatially variable, what happens when we merge geography and time in our preliminary analysis? The production frequency of movies over time, segmented by region, unveils yet another layer of complexity. This plot allows us to see how the output of different genres varies by country and time, which may reveal region specific time evolutions of ratings. Take drama movies as a case study: globally, the genre exhibits a steady increase in production. Yet, within the United Kingdom, drama production follows a strikingly different pattern, with clear peaks and troughs mirroring a bimodal distribution that hints at regional uniqueness. This contrast emphasizes how production trends differ locally from global norms, demonstrating the need to consider both regional and temporal dimensions when analyzing movies. Recognizing these patterns is essential, as regional differences in production frequency likely influence ratings and audience reception. By accounting for these regional and temporal impacts, we gain a more nuanced understanding of the global film landscape and its intricate relationship with ratings.

# Movies Ratings by Genre: A Deeper Dive


<iframe src ="{{ '/assets/plots/heatmap-ratings.html' | relative_url }}" style= " height: 100vh; width: 100%; border:none;"> </iframe>

Having established that movie production depends on both region of production and release date, we now turn our attention to another vital variable: genre. The heat map below presents the distribution of ratings for the top 20 genres, grouped into bins for easier visualization. This approach allows us to clearly observe differences in public perception and reception across genres. 
While many genres like action and black-and-white films show their highest rating counts in the 6.5-7 bin, other genres deviate significantly. Documentary and world cinema films, which stand out as the most non-fictional genres in the top 20 our analysis considers, dominate higher rating bins: documentaries peak in the 7.5-8 range, while world cinema leads in the 7-7.5 bin. Conversely, genres known for their polarizing nature, such as horror and thriller, show distributions skewed toward lower rating bins, reflecting divided audience opinions.
Even within genres with similar peak bins, variance tells an intriguing story. For instance, black-and-white movies have a tightly clustered distribution, with 64% of ratings falling within plus-minus 0.5 rating values of the 6-6.5 bin. Meanwhile, only 48% of action movie ratings occupy this same range, indicating a broader spread and more diverse audience reception, despite the same central bin between both genres’ ratings.
These differences underscore that ratings are not only time- and region-dependent but also profoundly genre-specific. This insight highlights the importance of genre as a variable in our deeper analysis of movie ratings, setting the stage for our main analysis of the interplay of movie genre with other factors such as production location and release date on ratings.

{% include_relative assets/plots/average-rating-line.html %}

To uncover deeper insights into movie ratings, we’ve created an intuitive visualization that lets you compare ratings of a specific genre between two regions over the decades. This tool plots the mean rating for each decade, from the 1950s to the 2000s, for the selected genre and region, complete with 95% confidence intervals for each data point. To avoid confusion, the line colors are independent of previous genre-based color schemes, as they represent regional comparisons. Importantly, no data point is plotted for a given region and decade unless at least three movies exist in that genre for that period.
With nine possible regions and 20 genres to explore, this visualization offers an impressive 720 combinations of comparative plots. Don’t worry, though! We’ve streamlined the analysis by using Western Europe as a baseline for comparison (since it’s where we’re based). This narrows the scope to eight regional comparisons across 20 genres, reducing the analysis to 160 plots—still comprehensive but more manageable. Even better, we’ve carefully reviewed each one and are excited to present a curated summary of the most compelling patterns and insights:

### Regional Dynamics:
- **North America** often underperforms relative to Western Europe across all top 20 genres, with the most notable instance being horror movies.  
- **India** displays a dramatic decline across multiple genres over decades, often starting above Western Europe but dropping significantly by the 1980s or later.  
- **Eastern Europe** frequently outperforms Western Europe in ratings, notably for dramas and crime fiction movies.  
- **Oceania** closely follows Western European trends in multiple genres, including dramas, comedies, short films, and mysteries.  

### Genre-Specific Observations:
- **Indian drama ratings** dropped by a value of 1.43 in IMDb rating, from the 1950s to the 2000s, mirroring broader trends across Indian cinema. Central and South America lack data for drama films but align in shape with Western Europe’s trend in mean ratings from the 1950s to the 2000s.  
- **Eastern Europe**, once above Western Europe by a statistically significant amount of over 1.5 in IMDb rating, has converged in ratings over time.  
- **North Africa and the Middle East** have seen a decline and convergence with Western Europe by the 2000s.  
- **Romance films** do not show significant regional disparities in ratings.  
- **Central and South America** saw a dramatic increase in action movie ratings post-1980s, contrasting with a consistent decline in North America and India.  
- **Eastern Europe** consistently outperforms Western Europe in crime fiction movies, with a noticeably statistically significantly higher value of mean rating in the 1980s.  

### Key Patterns:
- **Indian films** transitioning from outperforming to underperforming relative to Western Europe is a notable pattern, particularly in drama, comedy, musical, and mystery genres.  
- **Eastern Europe’s** comparative mean ratings for crime fiction movies are significantly higher than other regions, a trend not observed for Eastern Europe in other genres.  
- Significant **data gaps** exist for African regions, particularly Central and South Africa, across almost all genres except family and horror, where production was sporadic.  

Our visual analysis reveals a fascinating insight: within any given region, movie ratings vary significantly depending on the genre. To confirm this observation, we ran a one-way ANOVA test on each region’s movies, grouped by genre. The results showed statistically significant differences in mean ratings for nearly all genres, with the exceptions of documentary and romantic comedy, which exhibited more uniform ratings.
Taking this analysis a step further, we examined whether movie ratings differ across regions for a single genre. Using the Kruskal-Wallis test, which allows comparison of movie ratings across genres with different distribution shapes, we uncovered significant differences in movie ratings by region for most genres. Interestingly, Eastern Europe was the sole exception, where ratings appeared consistent regardless of the genre.
These findings confirm that both genre and region are pivotal factors influencing movie ratings. By recognizing these patterns, we reinforce the importance of including these features in predictive models to better understand and anticipate audience ratings based on readily available movie attributes.
Finally, this statistical rigor was extended to assess the impact time (release date) on movie ratings to confirm this feature’s usage as a predictive ratings feature. An ANOVA test, examining the interaction between decades, genres, and regions, confirmed statistically significant differences in ratings across time for all top 20 genres and nine geographical regions. While this interaction might sound complex, all that this is telling us is that we can confidently state that ratings vary meaningfully across time, genre, and location . Hence, their prediction must be at the minimum based on these attributes as predictive features.
Next, we analyzed the slopes of rating trends over decades for each genre and region. By focusing on the top five genres across the nine regions, we reduced the analysis to 45 slope comparisons. Of these, 21 showed statistically significant changes in mean ratings over time, demonstrating that for many genre-region combinations, ratings evolve dynamically across decades.
To probe deeper, we employed autoregressive integrated moving average (ARIMA) models to test whether release dates alone could predict ratings. The results revealed that release dates, while important, are not sufficient predictors in isolation. Instead, release dates must be combined with genre and region to capture the full complexity of movie ratings. This finding solidifies the case for incorporating all three features into our predictive model to achieve accurate and meaningful insights.


## Ethnicity 

<iframe src ="{{ '/assets/plots/ethnic-percentages.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/in-out.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/languages.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/historical-events.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/pie-chart.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>

<iframe src ="{{ '/assets/plots/genres-dist-rating.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>


<div style="display: flex; align-items: flex-start; gap: 20px;">

  <!-- Left Column: Text Content -->
  <div style="flex: 1; text-align: left;">
    <p>
      Beyond geography, movie ratings are clearly tied to the year of their release. Examining the global frequency of movie production across the top 20 genres reveals fascinating trends in line with this observation of ratings. Some genres, like drama, show a steady increase in production over time, perhaps saturating audiences and dampening enthusiasm for similar movies. Yet many genres, including comedy, romance, action, and mystery, show a bimodal production pattern. Peaks emerged prominently between the 1990s and 2000s, coinciding with the technological revolution and the rise of digital media. Another notable peak appears in the 1920s, often associated with the film industry’s resurgence during the post-WWI “Roaring Twenties.” These dual peaks suggest that historical and technological contexts play a crucial role in shaping production trends, which in turn impact ratings. This temporal variation underscores the importance of release dates when analyzing movie ratings, setting the stage for further exploration into time as a key factor in audience reception.
    </p>
  </div>

  <!-- Right Column: Images or Embedded Content -->
  <div style="flex: 1; display: flex; flex-direction: column; gap: 20px;">
    <div>
      <h3>The Movie Distribution 2</h3>
      <iframe src="{{ '/assets/plots/movie-distribution.html' | relative_url }}" style="height: 55vh; width: 100%; border: none;"></iframe>
    </div>
    <div>
      <h3>The Movie Race</h3>
      <iframe src="{{ '/assets/plots/bar-race.html' | relative_url }}" style="height: 55vh; width: 100%; border: none;"></iframe>
    </div>
  </div>

</div>



<iframe src ="{{ '/assets/plots/features.html' | relative_url }}" style = "height:100vh; width: 100%; border:none;"> </iframe>