const { TABLE_NAMEC } = process.env;

// データ作成
export const createData = (userId, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAMEC,
    Item: {
      ID: userId,
    },
  };

  // DynamoDBへデータを保存
  return appContext.dynamoDBContext.put(param);
};

// データ取得
export const readData = (userId, dataType, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAMEC,
    Key: {
      userId: { S: userId },
    },
    ExpressionAttributeValues: {
      ':u': userId,
    },
    KeyConditionExpression: 'ID = :u',
  };

  // DynamoDBからデータを取得
  return appContext.dynamoDBContext.getItem(param).Item.ID; // .BOOLつけた方がいいかも
};

// データ更新
export const updateData = (userId, dataType, data, appContext) => {
  // パラメータを作成
  const param = {
    TableName: TABLE_NAMEC,
    Key: {
      ID: userId,
    },
    UpdateExpression: 'set ID = :newValue',
    ExpressionAttributeValues: {
      ':newValue': { BOOL: data },
    },
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
