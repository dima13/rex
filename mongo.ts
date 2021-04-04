import mongoose, { Schema, Model, Document, model } from 'mongoose'
import { ObjectId } from 'mongodb'

mongoose.connect('mongodb://0.0.0.0:27017/rxjs', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    ssl: false
}, e => {
    if (e) {
        console.error({ text: '[MONGODB][Error] Connection error', e })
    }
})

mongoose.connection.on('error', e => {
    console.error({ text: '[MONGODB][Error] Connection error', e })
})

interface iUser extends Document {
    name: string
    age: number
}

type iUserModel = Model<iUser>

const userSchema = new Schema<iUser, iUserModel>({
    name: {
        type: String,
        required: true
    },
    age: Number
}, { timestamps: true })

let User = model<iUser, iUserModel>('User', userSchema)

let taskSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: String,
    user: {
        ref: 'User',
        type: Schema.Types.ObjectId
    }
}, { timestamps: true })

let Task = model('Task', taskSchema)


async function test() {
    let dima = new User({
        name: 'Dima',
        age: 26
    })
    try {
        await dima.save()
        let task1 = new Task({
            _id: new ObjectId(),
            title: 'Olololo',
            user: dima._id
        })
        await task1.save()
    } catch (e) {
        console.log('[e]: ' + e.message)
    }
}

async function search() {
    // let users = await User.find({ name: 'dima'})
    let users = await User.aggregate([{
        $lookup: {
            from: 'tasks',
            let: { userId: "$_id" },
            pipeline: [
                {
                    $match: {
                        $expr: {
                            $eq: ['$user', '$$userId']
                        }
                    }
                },
                { $limit: 100 }
            ],
            as: 'tasks'
        }
    }])
    console.log(users[0])
}

// test()
search()


