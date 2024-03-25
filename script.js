
const apikey =  "38dd40a324ba4cceb1f8bef42adc4acb" ;

const blogContainer = document.getElementById("blogContainer");

async function fetchRandomNews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
        
    }
    catch(error) {
        console.error("Error fetching news", error);
        return [];
    }
}

   function displayBlogs(articles){
        blogContainer.innerHTML = "";

        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blogCard");
            const img = document.createElement("img")
            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
            title.textContent = article.title;
            
            const description = document.createElement("p");
            description.textContent = article.description;
            
            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogContainer.appendChild(blogCard);
        });
   }

   (async ()=>{
    try{
    const articles = await fetchRandomNews();
    displayBlogs(articles);
    }
    catch(error){
        console.error("Error fetching news", error);
    }
})();

