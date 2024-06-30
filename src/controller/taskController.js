const TodoTask = require('../models/TodoTask');
const csvFile = require('csvtojson');
const { Parser } = require('json2csv');

const fs = require('fs');
const path = require('path');





exports.getAllTodo = async (req, res) => {
    try {
        if(!req.user._id){
            return res.status(400).json({ message: 'login after some time' });
        }
        const tasks = await TodoTask.find({user:req?.user?._id});
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getTodoById = async (req, res) => {
    try {
      if(!req.user._id){
        return res.status(400).json({ message: 'login after some time' });
      }
      const todo = await TodoTask.findById(req.params.id);
      if (!todo) return res.status(404).json({ message: 'Todo item is not found' });
      res.status(200).json(todo);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

exports.createTodo = async (req, res) => {

    if(!req.body.title || !req.body.description ){
        return res.status(400).json({ message: 'All fields are required' });
    }

    const todo = new TodoTask({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user:req.user._id
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

exports.updateTodo = async (req, res) => {
        console.log("22",req.params);
    try {
        if(!req?.user?._id){
            return res.status(400).json({ message: 'login after some time' });
        }
        const todo = await TodoTask.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        if (req.body.description != null) {
            todo.set({description: req.body.description});
        
        }
        if (req.body.status != null) {
            todo.set({status: req.body.status});
        
        }
        if(req.body.title != null){
            todo.set({title: req.body.title});
            
        }
        const updatedTodo = await todo.save();
        res.status(200).json(updatedTodo);
      } catch (err) {
        
        res.status(400).json({ message: err.message });
      }
}

exports.deletetodo = async (req, res) => {
    try {
        const todo = await TodoTask.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        await todo.deleteOne();
        res.status(200).json({ message: 'Todo item deleted' });
      } catch (err) {
        console.log("1",err);
        res.status(500).json({ message: err.message });
      }
}


exports.filterTodos = async (req, res) => {
    
    try {
        const status = req.query.status;
        const user = req.user._id;
        const filter={user:user};
        if(status){
            filter.status=status;
        }
        console.log(filter);
        const tasks = await TodoTask.find(filter);
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



exports.uploadFile = async (req, res) => {

    console.log("00000000000000",req.file?.path);
    try{
        if(!req.user._id){
            return res.status(400).json({ message: 'login after some time' });
        }
        const jsonArray = await csvFile().fromFile(req.file.path);
        const user = req.user._id;
        const tasks = jsonArray.map(t => ({ ...t, user }));
        const insertedTasks = await TodoTask.insertMany(tasks);
        res.status(200).json({ message: 'File uploaded successfully', insertedTasks });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

exports.downloadFile = async (req, res) => {
    try{
            if(!req.user._id){
                return res.status(400).json({ message: 'login after some time' });
            }
            const todo = await TodoTask.find({user:req?.user?._id});
            const fields = ['title', 'description', 'status'];
            const options = { fields };
            const parser = new Parser(options);
            const csv = parser.parse(todo);

            const filePath = path.join(__dirname, 'todoTasks.csv');
            fs.writeFileSync(filePath, csv);

            res.download(filePath, 'todoTasks.csv', (err) => {
                if (err) {
                    res.status(500).json({ message: 'Error downloading file', error: err.message });
                }
                fs.unlinkSync(filePath,err => {
                    if (err) {
                        res.status(500).json({ message: 'Error deleting file', error: err.message });
                    }
                }); 
            });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}