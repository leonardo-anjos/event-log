require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT
});

client.connect((err, res) => {
  if (err) {
    console.log('error!');
    client.end();
  } else {
    console.log('sucess!');
  }
});

// select * from req_log
client.query('select * from req_log', (err, res) => {
  if (err) {
    console.log(err)
    client.end()    
  } else {
    console.log(res.rows)    
    client.end()
  }
});

// export function saveLogReq(id_req_log, id_cons, endpoint_req_log, supplier_req_log, data_hora_req_log, header_req_log, payload_req_log) {  
//   const sql = 'INSERT INTO servico_posto VALUES ($1, $2, $3, $4, $5, $6, $7)';  
//   const params = [id_req_log, id_cons, endpoint_req_log, supplier_req_log, data_hora_req_log, header_req_log, payload_req_log];  
//   return client.query(sql, params);
// }

saveLogReq = () => {
  console.log('teste');
};

// select * from res_log
client.query('select * from res_log', (err, res) => {
  if (err) {
    console.log(err)
    client.end()    
  } else {
    console.log(res.rows)    
    client.end()
  }
});

// export function saveLogRes(id_res_log, id_cons, endpoint_res_log, supplier_res_log, data_hora_res_log, status_res_req_log, header_res_log, payload_res_log) {  
//   const sql = 'INSERT INTO servico_posto VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';  
//   const params = [id_res_log, id_cons, endpoint_res_log, supplier_res_log, data_hora_res_log, status_res_req_log, header_res_log, payload_res_log];  
//   return client.query(sql, params);
// }