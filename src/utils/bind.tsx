export default function bind(context = {}, props = []) {
  props.forEach(p => {
    const member = context[p];
    context[p] = typeof member === 'function' ? member.bind(context) : member;
  });
}
