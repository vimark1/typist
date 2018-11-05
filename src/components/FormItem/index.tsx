import React from 'react';

import './style.scss';

interface FormItemProps {
  type?: string;
  placeholder: string;
  autoFocus?: boolean;
  handler: (event?: any) => any | void;
  disabled?: boolean;
}

interface FormItemState {}

class FormItem extends React.Component<FormItemProps, FormItemState> {
  render() {
    const {
      type = 'text',
      placeholder,
      autoFocus = false,
      handler,
      disabled = false
    } = this.props;

    return (<div className="u-form-group">
      {
        type === 'button'
          ? <button disabled={disabled} onClick={handler}>{placeholder}</button>
          : <input
              disabled={disabled} 
              type={type}
              placeholder={placeholder}
              autoFocus={autoFocus}
              onChange={handler}/>
      }
    </div>);
  }
}

export default FormItem;
