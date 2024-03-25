
const apikey =  "38dd40a324ba4cceb1f8bef42adc4acb" ;

const blogContainer = document.getElementById("blogContainer");

 const searchinput = document.getElementById("searchinput");

 const searchbutton = document.getElementById("searchbutton");

async function fetchRandomNews(){
    try{
        const apiurl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apikey}`;
        
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
        
    }
    catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

async function fetchNewsQuery(query){
    try{
        const apiurl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apikey}`;
        
        const response = await fetch(apiurl);
        const data = await response.json();
        return data.articles;
        
    }
    catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

 searchbutton.addEventListener("click", async ()=>{
    const query = searchinput.value.trim();

    if(query!=""){
        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }catch(error){
            console.error("Error fetching news bu query", error);
        }
    }
 });

   function displayBlogs(articles){
        blogContainer.innerHTML = "";

        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blogCard");
            const img = document.createElement("img")
            img.src = article.urlToImage;
            img.alt = article.title;
            const title = document.createElement("h2");
           
            const newTitle = article.title.length > 30 ? article.title.slice(0,30) + "...." : article.title;
            title.textContent = newTitle;
            
            const description = document.createElement("p");
           
            const newDescription = article.description.length > 120 ? article.description.slice(0,120) + "...." : article.description;
            description.textContent = newDescription;
            
            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);

            blogCard.addEventListener("click", ()=>{
                window.open(article.url, "_blank");
            });
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

