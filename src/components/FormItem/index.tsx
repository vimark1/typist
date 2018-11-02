import React from 'react';

import './style.scss';

class FormItem extends React.Component {
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
