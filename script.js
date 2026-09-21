fetch("https://dummyjson.com/test")
  .then(
    function(response){
      console.log(response);
      
      return response.json()
    }

  )
  .then(
    function(data){
      console.log(data);
      
    }
    
  )





















