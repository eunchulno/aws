db.products.productRecommendation = async function(query){
  try{
    var eventInterest = await db.event_interests.findOne({where:query,raw:true});
    var productInterests = await db.product_interests.findAll({raw:true});
    var result = []
    for(productInterest of productInterests){
      var matchRate = 0;
      for(item in productInterest){
        if(item!="product_id"&&productInterest[item]==eventInterest[item]||eventInterest[item]=="전체"){
          matchRate++;
        }
      }
      result.push({product_id:productInterest.product_id,matchRate:matchRate});
    }
    result.sort(function(a,b){
      return a.matchRate > b.matchRate ? -1 : a.matchRate < b.matchRate ? 1 : 0;
    });
    var id = result.map(product=>{return product.product_id});
    var user = await db.events.findOne({where:query});
    var data = await db.products.findAll({where:{product_id:id},order: db.sequelize.fn('field',db.sequelize.col('products.product_id'),id),limit:10,
              include:[{model:db.image_urls,attributes:['image_url']},
                      {model:db.brands,attributes:['brand_name']},
                      {model:db.favorites,where:{user_id:user.user_id},attributes: [[db.sequelize.literal('case when user_id is not null then true else false end'), 'liked']],required:false}]
              })
    return {result:data};
  }
  catch(err){
    return {err:err}
  }
}
