export default function popupTemplate(props) {
  return `
      <div style="font-family: sans-serif; max-width: 220px;">
        <h3 style="margin: 0 0 4px 0;">${props.title}</h3>
        <p style="margin: 0;">${props.description || 'No description.'}</p>
      <small style="color: #aaa;">Type: ${props.category}</small>
    </div>
    `
}
