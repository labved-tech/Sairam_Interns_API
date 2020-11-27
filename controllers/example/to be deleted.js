if (queryObj.query === undefined) {
    // GENERAL QUERY
    console.log('queryObj is empty');

    // EXECUTE QUERY
    examples = await Example.find();

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      message: 'Got All Example',
      examples,
    });
  } else {
    // REMOTE TABLE QUERY

    // 1B) Advanced Filtering
    let queryStr;

    if (queryObj.generalSearch !== undefined) {
      queryStr = queryObj.query.generalSearch;
      queryStr = queryStr.trim();
      queryStr = { $text: { $search: `${queryStr}` } };
      query = Example.find(queryStr);
    }
    if (queryObj.query === '' || queryObj.query.generalSearch === '') {
      query = Example.find();
    } else if (queryObj.query.generalSearch !== '') {
      queryStr = queryObj.query.generalSearch;
      queryStr = queryStr.trim();
      queryStr = { $text: { $search: `${queryStr}` } };
      query = Example.find(queryStr);
    }

 




    // EXECUTE QUERY
    examples = await query;


}
  


    // 1C) General Search
    tempObj = queryObj.query;
    console.log('tempObj2 :', tempObj);
    console.log('queryStr :', queryStr);

    queryStr = JSON.stringify(tempObj.generalSearch);
    queryStrLen = queryStr.length;
    queryStr = JSON.parse(queryStr);
    queryStr = queryStr.trim();

    console.log('queryStrLen', queryStrLen);

    if (queryStrLen < 3) {
      tempObj = undefined;
      console.log('tempObj3 :', tempObj);
    }

    if (tempObj.generalSearch !== undefined) {
      queryStr = tempObj.generalSearch;
      queryStr = queryStr.trim();
      queryStr = { $text: { $search: `${queryStr}` } };
      query = query.find(queryStr);
    }