const { TABLE_NAME } = process.env;

// データ作成
export const createData = (userId, dataType, status, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    Item: {
      ID: userId,
      DataType: dataType,
      Status: status,
    },
  };

  // DynamoDBへデータを保存
  return appContext.dynamoDBContext.put(param);
};

// データ取得
export const readData = (ID, dataType, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    ExpressionAttributeValues: {
      ':u': ID,
      ':d': dataType,
    },
    KeyConditionExpression: 'ID = :u and DataType = :d',
  };

  // DynamoDBからデータを取得
  return appContext.dynamoDBContext.query(param);
};

// データ更新
export const updateData = (ID, dataType, status, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAME,
    Key: {
      ID,
      DataType: dataType,
    },
    ExpressionAttributeValues: {
      ':d': status,
    },
    ExpressionAttributeNames: {
      '#d': 'Status',
    },
    UpdateExpression: 'set #d = :d',
  };

  // DynamoDBへデータを更新
  return appContext.dynamoDBContext.update(param);
};

// データ削除
/* export const deleteData = (userId, dataType, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAMEC,
    Key: {
      ID: userId,
      DataType: dataType,
    },
  };

  // DynamoDBへデータを削除
  return appContext.dynamoDBContext.delete(param);
}; */
