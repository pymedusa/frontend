export default function(bytes) {
    // http://stackoverflow.com/a/14919494/2311366
    if(Math.abs(bytes) < 1024) {
        return bytes + ' B';
    }
    var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
    var u = -1;
    do {
        bytes /= 1024;
        ++u;
    } while(Math.abs(bytes) >= 1024 && u < units.length - 1);
    return bytes.toFixed(1) + ' ' + units[u];
}
