const addNewVisitors = (dataObj) => {
    return JSON.stringify(dataObj);
        //console.log(JSON.stringify(dataObj));
      
};

addNewVisitors ({
    name: 'faith',
    age: 23,
    date: '2019-12-12',
    time: '12:40:23',
    assistor: 'Kim',
    comments: 'done'
})

export default addNewVisitors;