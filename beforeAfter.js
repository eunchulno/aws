db.products.productRecommendation = function(query){
  return db.event_interests.findAll({where:query}).then(result=>{
    if(result.length==1) {
      return db.product_interests.findAll({raw:true}).then(result2=>{
        var event_id = result[0].event_id;
        var obj = [];
        for(var key2 in result2) {
          var cnt = 0;
          var product_id = result2[key2].product_id;
          for(var key in result2[key2]){
            if(key=='gender'){
              if(result[0][key]=="전체"||result[0][key]==result2[key2][key])
                cnt++
            }
            else if(result[0][key]==result2[key2][key]&&result[0][key]==true&&result2[key2][key]==true){
              cnt++;
            }
          }
          var cnt2 = cnt;
          cnt = cnt/52;
          obj.push({product_id:product_id,match_percent:(cnt*100).toFixed(5)+'%',cnt:cnt2});
        }
        obj.sort(function(a,b){
          return a.cnt > b.cnt ? -1 : a.cnt < b.cnt ? 1 : 0;
        });
        var id = [];
        for(var i =0; i<10; i++){
          id.push(obj[i].product_id);
        }
        console.log(obj);
        return db.events.findOne({where:query,attributes:['user_id']}).then((result)=>{
          return db.products.findAll({where:{product_id:id},order: db.sequelize.fn('field',db.sequelize.col('products.product_id'),id),limit:10,
            include:[{model:db.image_urls,attributes:['image_url']},
                    {model:db.brands,attributes:['brand_name']},
                    {model:db.favorites,where:{user_id:result.user_id},attributes: [[db.sequelize.literal('case when user_id is not null then true else false end'), 'liked']],required:false}]
            }).then(result=>{
            return {result:result}
          }).catch(err=>{
            return {err:err}
          })
        }).catch(err=>{
          return {err:err}
        })
      }).catch(err=>{
        return {err:err}
      })
    }
    else{
      return {err:"Non Contents"}
    }
  }).catch(err=>{
    return {err:err}
  });
}
