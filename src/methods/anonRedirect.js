export default function(e) {
    e.preventDefault();
    var url = e.target.nodeName === 'IMG' ? e.target.parentElement.href : e.target.href;
    window.open(MEDUSA.info.anonRedirect + url, '_blank');
}
