const uuidv4 = require('uuid/v4')
const fs = require('fs')
const path = require('path')

class Course{
    constructor(title, price, img){
        this.title=title;
        this.price = price;
        this.img = img;
        this.id = uuidv4();
    }

    toJSON(){
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }
    async save() {
        const course = await Course.getAll();
        course.push(this.toJSON())
        return new Promise((res, rej) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'courses.json'), JSON.stringify(course), (err) => {
                if(err) {
                   rej(err)
                } else(
                    res()
                )
            })
        })
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'), 'utf-8', (err, data) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(JSON.parse(data))
                }
            })
        })
    }
}


module.exports = Course