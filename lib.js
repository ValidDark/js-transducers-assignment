

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
            .reduce( ( sum, next) => [...sum,...next.orders] , [] )
            .filter( a => a.timeStamp >= startTime && a.timeStamp <= endTime )
            .reduce( (sum, next) => [...sum, ...next.items] ,[])
            .reduce( (sum, next) => {
                      if(sum[next.name] === undefined)
                        {
                          sum[next.name] = 0
                        }
                      sum[next.name] += next.price
                      return sum
                          } ,{})

            // - Old way instead of final .reduce() - //
            // .forEach( a => {
            //                 if(rObj[a.name] === undefined)
            //                 {
            //                   rObj[a.name] = 0
            //                 }
            //                 rObj[a.name] += a.price
            //                }
            //            )


}

//


module.exports = {
  customer,
  order,
  item,
  grossPerItemInState
}
