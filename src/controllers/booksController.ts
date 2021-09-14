import { Request, Response } from 'express'
import BookModel, { Book } from '../models/Book'

class BookController {
	public async index (req: Request, res: Response): Promise<void> {
		const books: Book[] = await BookModel.find()
		console.log('book', books);
		res.render('books/index', {
			title: "Books",
			books
		})
	}
	public renderFormBook (req: Request, res: Response) {
		res.render('books/add', {
			title: "Add a book"
		})
	}

	/**
	 * saveBook
	 */
	public async saveBook(req: Request, res: Response) {
		const { title, author, isbn } = req.body
		const book: Book = new BookModel({ title, author, isbn })
		await book.save()
		res.redirect('/books')
	}
}

export const booksController =  new BookController()