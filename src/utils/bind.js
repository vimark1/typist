export default function bind(context = {}, props = []) {
  props.forEach(p => context[p] = context[p].bind(context));
}
