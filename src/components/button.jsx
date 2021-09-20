import PropTypes from 'prop-types'

function button(props) {
    const bg = props.background ? `bg-${props.background}` : 'bg-main';
    const size = props.size ? 'btn-' + props.size :'';
    const animate=  props.animate ? `btn-animate` :'';

    return (
      <button
      className = {` btn ${bg} ${size} ${animate}`}
      onClick={props.onclick?()=> props.onclick(): null}
      >   
        <span className ='btn__txt'> {props.children} </span>
        {
            props.icon ? (
                <span  className ='btn__icon'>
                    <i className ={`${props.icon} bx-tada`}></i>
                </span>
            ):null
        }
      </button>
    )
}

button.propTypes = {
 background: PropTypes.string,
 size: PropTypes.string,
 icon: PropTypes.string,
 animate: PropTypes.bool,
 onclick: PropTypes.func
}

export default button

