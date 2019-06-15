exports.getQueryUser = async (pool, cid) => {
  let conn;
  let result;
  try{
    conn = await pool.getConnection();
    const [rows, fields] = await conn.query('SELECT * FROM user WHERE id=? ', [cid]);
    result = rows;
  }catch (error){
    throw error;
  }finally{
    if(conn) await conn.end();
    return result
  }
};//일단 전체적으로 리턴하고 전체적으로 할 수 없다 한다면 auth.js에서 queryUser을 두번 쓴 것을 
//나누어서 사용할것.

exports.allUsers = async (pool) => {
  let conn;
  let result;
  try{
    conn = await pool.getConnection();
    result = await conn.query("select * from user ");
  }catch(err){
    throw err;
  }finally{
    if(conn) await conn.end();
    return result;
  }
};

exports.registerUser = async (pool, user) => {
  let conn;
  const sql = "INSERT INTO user(id,name,password,birth,gender,phoneNumber) VALUES (?,?,?,?,?,?) ";
  let isSuccess = true;
  try{
    conn = await pool.getConnection();
    await conn.query(sql,user);
  }catch (error){
    isSuccess = !isSuccess;
    throw new error;
  }finally{
    if(conn) await conn.end();
    return isSuccess;
  }
};

/*exports.transSmsMessage = (req,res) => {
 const phoneNumber = "010-9121-0769"

  request({
    method: 'POST',
    json: true,
    uri: `https://api-sens.ncloud.com/v1/sms/services/${process.env.SENS_SERVICEID}/messages`,
    headers: {
      'Content-Type': 'application/json',
      'X-NCP-auth-key': process.env.SENS_ACCESSKEYID,
      'X-NCP-service-secret': process.env.SENS_SERVICESECRET
    },
    body: {
      type: 'sms',
      from: process.env.SENS_SENDNUMBER,
      to: [`${phoneNumber}`],
      content: `WeGoing 인증번호 341353입니다.`
    }
  });
}*/

exports.showUserProfile = async (cid,pool) => {
  let conn;
  const sql = "SELECT id,name,birth,gender,picture,intro,scope,point FROM user WHERE id = ? "
  let result;
  try{
    conn = await pool.getConnection();
    const [rows, fields] = await conn.query(sql,cid);
    result = rows;
  }catch (error){
    throw error;
  }finally{
    if(conn) await conn.end();
    return result
  }
};

exports.addFriend = async (idList,pool) => {//requester랑receiver가 db값과 둘다 같다면?  
  let conn;
  const sql = "INSERT INTO friends(requester,receiver,state) VALUES (?,?,?) "
  let isSuccess = true;
  try{
    conn = await pool.getConnection();
    await conn.query(sql,idList);
  }catch (error){
    isSuccess = !isSuccess;
    throw new error;
  }finally{
    if(conn) await conn.end();
    return isSuccess;
  }
}

exports.acceptFriend = async (knotArr,pool) => {//update 영향 받은 행이 없다면?
  let conn;
  const sql = "UPDATE friend SET state = 1 WHERE receiver = ? and requester = ? "
  let isSuccess = true;
  try{
    conn = await pool.getConnection();
    await conn.query(sql,knotArr,(err,result,field) => {
        if(err){
          throw new err;
        } else if(result.affectedRows === 0){
          isSuccess = !isSuccess;
        }
      });
  }catch (error){
    isSuccess = !isSuccess;
    throw new error;
  }finally{
    if(conn) await conn.end();
    return isSuccess;
  }
}

exports.refuseFriend = async (knotArr,pool) => {
  let conn;
  const sql = "DELETE FROM friend WHERE receiver = ? and requester = ? "
  let isSuccess = true;
  try{
    conn = await pool.getConnection();
    await conn.query(sql,knotArr,(err,result,field) => {
        if(err){
          throw new err;
        } else if(result.affectedRows === 0){
          isSuccess = !isSuccess;
        }
      });
  }catch (error){
    isSuccess = !isSuccess;
    throw new error;
  }finally{
    if(conn) await conn.end();
    return isSuccess;
  }
}

exports.getChattingRooms = async (pool) => {
  let conn;
  const sql = "SELECT roomNumber,roomName,master,password,type FROM chatroom "
  let result;
  try{
    conn = await pool.getConnection();
    const [rows, fields] = await conn.query(sql,cid);
    result = rows;
  }catch (error){
    throw error;
  }finally{
    if(conn) await conn.end();
    return result
  }
}

exports.getDms = async (cid,pool) => {
  let conn;
  const sql = "SELECT id,sender,message,time,isRead FROM dm WHERE receiver = ? "
  let dmResult;
  try{
    conn = await pool.getConnection();
    const [rows, fields] = await conn.query(sql,cid);
    dmResult = rows;
  }catch (error){
    throw error;
  }finally{
    if(conn) await conn.end();
    return dmResult;
  }
}

exports.getPicture = async (cid,pool) => {
  let conn;
  const sql = "SELECT picture FROM user WHERE id = ? "
  let pictureResult;
  try{
    conn = await pool.getConnection();
    await conn.query(sql , cid, (err,result,fields) => {
      if (err) throw err;
      console.log(result);
      pictureResult = result;
    });
 //   console.log(rows);
  }catch (error){
    throw error;
  }finally{
    if(conn) await conn.end();
    return pictureResult;
  }
} 