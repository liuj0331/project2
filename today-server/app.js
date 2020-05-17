const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());


let credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
let connection = mysql.createConnection(credentials);
connection.connect();

function rowToObject(row){
	return{
	  id: row.id,
	  userName: row.userName,
	  phone_Number: row.phone_Number,
	  email: row.email,
	  campus: row.campus,
	  itemName: row.itemName,
	  itemInfo: row.itemInfo,
	};
}
app.get('/memories/userName/:userName', (request,response) => {
	const query = 'SELECT userName, phone_Number, email, campus, itemName, itemInfo, id FROM memory WHERE is_deleted = 0 AND userName = ? ORDER BY userName DESC, updated_at DESC';
	//const query = 'SELECT * FROM memory Where userName = ?';
	const params = [request.params.userName];
	connection.query(query, params, (error, rows) => {
		response.send({
			ok: true,
			memories: rows.map(rowToObject),
		});
	});
});

app.get('/memories/id/:id', (request,response) => {
        const query = 'SELECT userName, phone_Number, email, campus, itemName, itemInfo, id FROM memory WHERE is_deleted = 0 AND id = ? ORDER BY userName DESC, updated_at DESC';
        //const query = 'SELECT * FROM memory Where userName = ?';
        const params = [request.params.id];
        connection.query(query, params, (error, rows) => {
                response.send({
                        ok: true,
                        memories: rows.map(rowToObject),
                });
        });
});


app.post('/memories', (request,response) => {
	const query = 'INSERT INTO memory(userName, phone_Number, email, campus, itemName, itemInfo) VALUES(?, ?, ?, ?, ?, ?)'; 
	const params = [request.body.userName, request.body.phone_Number, request.body.email, request.body.campus, request.body.itemName, request.itemInfo]; 
	connection.query(query, params, (error, result) => { 
		response.send({ 
			ok: true,
			id: result.insertId,
		}); 
	}); 
});

app.patch('/memories/:id', (request,response) => {
    const query = 'UPDATE memory SET userName = ?, phone_Number = ?, email = ?, campus = ?, itemName = ?, itemInfo = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [request.body.userName, request.body.phone_Number, request.body.email, request.body.campus, request.body.itemName, request.body.itemInfo, request.params.id];

    connection.query(query, params, (error, rows) => {
            response.send({
                    ok: true,
            });
    });
});

app.delete('/memories/:id', (request,response) => {
    const query = 'UPDATE memory SET is_deleted = 1, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
    const params = [request.params.id];

    connection.query(query, params, (error, rows) => {
            response.send({
                    ok: true,
            });
    });
});

const port = 3443;
app.listen(port,() =>{
    console.log(`We're live on port ${port}!`);
});
