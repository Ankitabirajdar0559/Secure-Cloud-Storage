import "../css/RecentFiles.css";


const RecentFiles = ({files=[]}) => {


return (

<div className="recent-box">


<table>


<thead>

<tr>

<th>Name</th>
<th>Size</th>
<th>Type</th>
<th>Date</th>

</tr>

</thead>



<tbody>


{
files.map((file)=>(


<tr key={file.id}>


<td>
📄 {file.fileName}
</td>


<td>

{
(file.fileSize/1024).toFixed(2)
}

KB

</td>


<td>

{file.fileType}

</td>



<td>

{
new Date(file.uploadedAt)
.toLocaleDateString()
}

</td>


</tr>


))
}


</tbody>



</table>


</div>


);


};


export default RecentFiles;