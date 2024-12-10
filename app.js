const cardDiv = document.getElementById('cardDiv');
        const inputField = document.getElementById('input');

        const search = () => {
            // Clear previous search results
            cardDiv.innerHTML = '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>';

            const newsAPI = `https://newsapi.org/v2/everything?q=${inputField.value}&from=2024-11-09&sortBy=publishedAt&apiKey=16368914c65344c3bbcf2cfc55ce7c3e`;

            fetch(newsAPI)
                .then(res => res.json())
                .then(data => {
                    cardDiv.innerHTML = ''; // Clear loading spinner

                    if (data.articles && data.articles.length > 0) {
                        data.articles.forEach(article => {
                            cardDiv.innerHTML += `
                                <div class="card" style="width: 18rem;">
                                    <img src="${article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image'}" class="card-img-top" alt="Image unavailable">
                                    <div class="card-body">
                                        <h5 class="card-title">${article.title}</h5>
                                        <p class="card-text">${article.description || 'No description available.'}</p>
                                        <a href="${article.url}" target="_blank" class="btn btn-primary">Read More</a>
                                    </div>
                                </div>`;
                        });
                    } else {
                        cardDiv.innerHTML = '<p class="text-center">No results found. Try a different search term.</p>';
                    }
                })
                .catch(error => {
                    console.error(error);
                    cardDiv.innerHTML = '<p class="text-center text-danger">Failed to load news. Please try again later.</p>';
                });
        };