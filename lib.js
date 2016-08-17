

function customer(orders, state) {
  return { orders, state } //orders is array of order, state is string for a US state,  AZ, TN, etc.
}

function order(items, timeStamp) {
  return { items, timeStamp } //items is an array of item, timestamp is
}

function item(name, price) { //name is a string for item name,  price is a number for price of item
  return { name, price }
}

/*
 *
 * @param state String name of a state.
 * @param startTime a Number representing a starting time.
 * @param endTime a Number representing an ending time.
 * @param customers an array of Customer objects.
 * @returns An Object of item names mapped to the total sales of that item
 *  in the given State and between the given startTime and endTime.
 */
function grossPerItemInState(state, startTime, endTime, customers) {


return customers
            .filter( a => a.state === state)
            .reduce( flatMap(customer => customer.orders), [])
            .filter( a => a.timeStamp >= startTime && a.timeStamp <= endTime )
            .reduce( flatMap(order => order.items), [])
            .reduce( groupBy(0 , (a,b) => a + b )( item => item.name , item => item.price ),{})
}


function groupBy(initV, combine){
 return function (toKey, toValue){
   return function (group, element) {
     const key = toKey(element)
     const value = toValue(element)

     if(group[key] === undefined)
       {
         group[key] = initV
       }
       group[key] = combine(group[key], value)
     return group
   }
  }
 }


 //OLD reduce
 //.reduce( (sum, next) => {
 //          if(sum[next.name] === undefined)
 //            {
 //              sum[next.name] = 0
 //            }
 //          sum[next.name] += next.price
 //          return sum
 //              } ,{})


 // function groupBy(mapperA, mapperB, initV, typeFunc) {
 //   return function (sum, element) {
 //
 //     if(sum[mapperA(element)] === undefined)
 //       {
 //         sum[mapperA(element)] = initV
 //       }
 //       sum[mapperA(element)] = typeFunc(sum[mapperA(element)], mapperB(element))
 //     return sum
 //   }
 // }






            // - Old way instead of final .reduce() - //
            // .forEach( a => {
            //                 if(rObj[a.name] === undefined)
            //                 {
            //                   rObj[a.name] = 0
            //                 }
            //                 rObj[a.name] += a.price
            //                }
            //            )




//const mapCombine =
//    combiner => mapper => (sum, element) => combiner(sum, mapper(element))

//  const mapCombine =
//    function(combiner){
//      return function(mapper){
//        return function(sum, element){
//          return combiner(sum, mapper(element))
//        }
//      }
//    }


const flatMap = (mapper) =>
                (sum, element) =>
                [...sum, ...mapper(element)]




// function flatMap (mapper) {
//   return function (orders, element) {
//     return [...orders, ...mapper(element)]
//   }
// }




module.exports = {
  customer,
  order,
  item,
  grossPerItemInState
}
