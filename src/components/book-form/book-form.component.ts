import { ChangeDetectionStrategy, Component, input, output, effect} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Book } from '../../shared/book';

@Component({
  selector: 'k-book-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
  imports: [ReactiveFormsModule],
})
export class BookFormComponent {
  // output eventEmitter
  create = output<Book>();
  edit = output<Book>();
  // input signals
  currentBook = input<Book | undefined>();

  updateForm = effect(()=>{
    // console.log('currrentBook',this.currentBook());
    const currentBook = this.currentBook();
    const isbnControl = this.bookForm.controls.isbn;

    if(currentBook) {
      this.bookForm.patchValue(currentBook);
      isbnControl.disable();
    } else {
      isbnControl.enable();
    }

  });

  bookForm = new FormGroup({

    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    description: new FormControl('', {
      nonNullable: true
    })

  });


  isInvalid(control: FormControl): boolean {
    return control.invalid && control.touched
  }

  submitForm() {
    const currentBook = this.currentBook();
    if(currentBook) {
      const {rating, price} = currentBook;
      const existingBook: Book = {
        ...this.bookForm.getRawValue(),
        rating: rating,
        price: price
      }
      this.edit.emit(existingBook)

    } else {

      const newBook: Book = {
        ...this.bookForm.getRawValue(),
        rating: 1,
        price: 1
      }

      this.create.emit(newBook);
    }

    this.bookForm.reset();
  }

}
