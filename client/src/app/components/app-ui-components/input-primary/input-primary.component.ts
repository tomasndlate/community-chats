import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input-primary',
  templateUrl: './input-primary.component.html',
  styleUrls: ['./input-primary.component.css']
})
export class InputPrimaryComponent {
  inputId: string = `input-${Math.random().toString(36).slice(2, 9)}`;

  /** Type of input
   * @type { string } - text | password
   */
  @Input() inputType: string = "text";

  /** Is input disabe
   * @type { boolean } - true | false
   */
  @Input() isInputDisabled: boolean = false;

  /** Status of the input
   * @type { string } - default | valid | invalid
   */
  @Input() status: string = "";

  /** Input label
   * @type { string }
   */
  @Input() label: string = "";

  /** Predefined input value
   * @type { string }
   */
  @Input() inputValue: string = "";

  @Output() inputValueChange = new EventEmitter<string>();
  @Output() inputDisabledChange = new EventEmitter<string>();

  handleInputChange(){
    this.inputValueChange.emit(this.inputValue);
  }

  handleInputDisabledChange(){
    this.inputDisabledChange.emit()
  }
}
