import React from 'react';

import './style.scss';

interface FormItemProps {
  type?: string;
  placeholder: string;
  autoFocus?: boolean;
  handler: (event?: any) => any | void;
  disabled?: boolean;
}

class FormItem extends React.Component<FormItemProps> {
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
