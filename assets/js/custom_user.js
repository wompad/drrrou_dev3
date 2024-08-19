var REGION = "CARAGA";

const bgcolor = "#B6DDE8";

var asof = "";

var toexcel = 1;

let ec_update_save = 1;

var provinces = [
	{
		id 		: 1,
		name 	: 'AGUSAN DEL NORTE'
	},
	{
		id 		: 2,
		name 	: 'AGUSAN DEL SUR'
	},
	{
		id 		: 3,
		name 	: 'SURIGAO DEL NORTE'
	},
	{
		id 		: 4,
		name 	: 'SURIGAO DEL SUR'
	},
	{
		id 		: 5,
		name 	: 'PROVINCE OF DINAGAT ISLANDS'
	},
	{
		id 		: 6,
		name 	: 'OTHER REGION'
	}
];

var rs = [];

$('#newreporttitle').attr("disabled",1);
	

get_province();

var tblmswd = $('#tbl_mswdo');
if(tblmswd.length){
	get_mswdo();
}

var cmatleader = $('#tbl_cmatleader');
if(cmatleader.length){
	get_matleader();
}
// get_matmember();
getDisaster();
var evac_stats = $("#evac_stats");
if(evac_stats.length){
	getURL();
}

var mswdid;
var matleaderid;
var matmemberid;
var dtable;
var newreptitle = [];
var fnfi_list = [];

var newi = 0;
$('[data-toggle="tooltip"]').tooltip();

function URLID(){

	var t = window.location.href;
	t = t.split("=");
	var st = t[1];
	st = st.replace(/\D/g,'');
	return st;

}

function alerts(){
	$.confirm({
	    title: '',
	    content: 'Data successfully saved',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Okay',
	    		btnClass: 'btn-blue',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}

function msgbox(message){
	$.confirm({
	    title: 'Warning!',
	    content: message,
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Okay',
	    		btnClass: 'btn-danger',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}

function alertError(){
	$.confirm({
	    title: '',
	    content: 'Error in saving data',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-times"></i> Okay',
	    		btnClass: 'btn-danger',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}

function alertRowErr(){
	$.confirm({
	    title: '',
	    content: 'Row cannot be removed!',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-times"></i> Close',
	    		btnClass: 'btn-danger',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}

function alertQRTNumberExist(){
	$.confirm({
	    title: '',
	    content: 'QRT Team Number Already Exist',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-times"></i> Close',
	    		btnClass: 'btn-danger',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}

function alertnoNumber(){
	$.confirm({
	    title: '',
	    content: '<i class="fa fa-info-circle"></i> Please enter valid recipients',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-times-circle-o"></i> Okay',
	    		btnClass: 'btn-danger',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}

function alertnoQRTNumber(){
	$.confirm({
	    title: '',
	    content: '<i class="fa fa-info-circle"></i> Kindly fill [QRT Team Number, Team Leader, Statistician] to continue!',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-times-circle-o"></i> Okay',
	    		btnClass: 'btn-danger',
	    		keys: ['enter', 'shift']
	    	}
	    }
	});
}


function resetAll(){

	$('#fullname').val('');
	$('#mayor').val('');
	$('#vmayor').val('');
	$('#province').val('');
	$('#city').empty().append(
        "<option value=''>-- Select City/Municipality --</option>"
    )
	$('#mobile').val('');
	$('#telephone').val('');
	$('#emailadd').val('');

	$('#savedata_mswd').prop('disabled',false);
	$('#updatedata_mswd').prop('disabled',true);
	$('#deletedata_mswd').prop('disabled',true);

}

function resetAllMAT(){

	$('#fullname').val('')
	$('#position').val('')
	$('#program').val('')
	$('#gender').val('')
	$('#yearinservice').val('')
	$('#course').val('')
	$('#province').val('')
	$('#city').empty().append(
        "<option value=''>-- Select City/Municipality --</option>"
    )
	$('#mobile').val('')
	$('#emailadd').val('')

	$('#savedata_mat').prop('disabled',false);
	$('#updatedata_mat').prop('disabled',true);
	$('#deletedata_mat').prop('disabled',true);

}

function resetAllMATMEMBER(){

	$('#fullname').val('')
	$('#position').val('')
	$('#program').val('')
	$('#gender').val('')
	$('#province').val('')
	$('#city').empty().append(
        "<option value=''>-- Select City/Municipality --</option>"
    )
	$('#mobile').val('')
	$('#emailadd').val('')

	$('#savedata_matmember').prop('disabled',false);
	$('#updatedata_matmember').prop('disabled',true);
	$('#deletedata_matmember').prop('disabled',true);

}

function enablebuttons(){
	$('#savedata_mswd').prop('disabled',true);
	$('#updatedata_mswd').prop('disabled',false);
	$('#deletedata_mswd').prop('disabled',false);
}

function enablebuttonsMAT(){
	$('#savedata_mat').prop('disabled',true);
	$('#updatedata_mat').prop('disabled',false);
	$('#deletedata_mat').prop('disabled',false);
}

function enablebuttonsMATMEMBER(){
	$('#savedata_matmember').prop('disabled',true);
	$('#updatedata_matmember').prop('disabled',false);
	$('#deletedata_matmember').prop('disabled',false);
}

// C/MSWDO Functions =====================================================================================================================================================================

function get_mswdo(){

	// if(dtable){
	// 	dtable.destroy();
	// }

	$('#tbl_mswdo tbody').empty();

	$.getJSON("/Pages/get_mswdo",function(a){  

	    for(var i in a){
	      $('#tbl_mswdo tbody').append(
	          "<tr style='cursor:pointer' title='Click on each row to edit/delete data' onclick='passmswdData("+a[i].id+")'>"+
	          	"<td style='font-size:12px'>"+a[i].fullname+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].mayor+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].vmayor+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].province_name+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].municipality_name+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].mobile+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].telephone+"</td>"+
	          	"<td style='font-size:12px'>"+a[i].emailaddress+"</td>"+
	          "</tr>"
	      )
	    }

	    $('#tbl_mswdo .mswd_filters td').each( function () {
	        var title = $('#tbl_mswdo thead th').eq( $(this).index() ).text();
	        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	    } );
 

	    var dtable = $('#tbl_mswdo').DataTable({
	    	pageLength 		: 20,
	    	bLengthChange 	: !1,
	    	bSort 			: !1
	    });

	    dtable.columns().eq( 0 ).each( function ( colIdx ) {
	        $( 'input', $('.mswd_filters td')[colIdx] ).on( 'keyup change', function () {
	            dtable
	                .column( colIdx )
	                .search( this.value )
	                .draw();
	        } );
	    } );

	    $('#tbl_mswdo_filter').hide();

	    //dtable = $('#tbl_mswdo').DataTable();

	});	

}

get_fnfi();
var fnfi = [];
var fnfi_full = [];

function get_fnfi(){

	$.getJSON("/Pages/get_fnfi",function(a){  

		for(var t in a){
			fnfi.push(a[t].fnfi_name);
			fnfi_full.push(a[t]);
		}

		$("#fnfiassistance").autocomplete({
			source : fnfi
		});
	})
}	

$('#fnfiassistance').blur(function(){
	var a = $(this).val();
	for(var i in fnfi_full){
		if(fnfi_full[i]['fnfi_name'].toLowerCase() == a.toLowerCase()){
			$('#fnficost').val(fnfi_full[i]['cost']);
		}
	}

})

function get_province(){

	$('#province').empty();
	$('#province').append(
	    "<option value=''>-- Select Province --</option>"
	);	

	$.getJSON("/Pages/get_province",function(a){  

	    for(var i in a){
	      $('#province').append(
	          "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#addfaminsideECprov').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#addDamprov').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#addfamOECprov').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#addcasualtyprov').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#provinceAssistance').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#province_dam_per_brgy').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#addfamOECprovO').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#addfamNinsideECprov').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	      $('#provinceSexAge').append(
	      	  "<option value='"+a[i].id+"'>"+a[i].province_name+"</option>"
	      )

	    }

	});

}

$('#province').change(function(){

	var pid = $('#province').val();	

	$('#city').empty();
	$('#city').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#city').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})

$('#provinceAssistance').change(function(){

	var pid = $('#provinceAssistance').val();	

	$('#cityAssistance').empty();
	$('#cityAssistance').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#cityAssistance').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})

$('#addfamNinsideECprov').change(function(){

	var pid = $('#addfamNinsideECprov').val();	

	$('#addfamNinsideECcity').empty();
	$('#addfamNinsideECcity').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#addfamNinsideECcity').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})

//latest

$('#addfaminsideECprov').change(function(){

	var pid = $('#addfaminsideECprov').val();	

	$('#addfaminsideECcity').empty();
	$('#addfaminsideECcity').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#addfaminsideECcity').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

	autocompleteOriginProvince();

})

$('#addDamprov').change(function(){

	var pid = $('#addDamprov').val();	

	$('#addDamcity').empty();
	$('#addDamcity').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#addDamcity').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})

$('#provinceSexAge').change(function(){

	var pid = $('#provinceSexAge').val();	

	$('#citySexAge').empty();
	$('#citySexAge').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#citySexAge').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})

$('#addDamcity').change(function(){

	var datas = {
		id 					: $(this).val(),
		disaster_title_id 	: URLID()
	}

	$.getJSON("/Pages/check_municipality_in_damass",datas,function(a){  
		if(a > 0){
			msgbox("Municipality already exist. Kindly check on Damage and Assistance Tab and double the entry to update data!");
			$('#addDamcity').val('');
		}
	});

})

$('#addfamOECprov').change(function(){

	var pid = $('#addfamOECprov').val();	

	$('#addfamOECcity').empty();
	$('#addfamOECcity').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#addfamOECcity').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )

	    		$('#addfamOECcityO').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )

	    	}
	    }
	});

	$('#addfamOECprovO').val(pid);

})

$('#addfamOECprovO').change(function(){

	var pid = $('#addfamOECprovO').val();	

	$('#addfamOECcityO').empty();
	$('#addfamOECcityO').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){

	    		$('#addfamOECcityO').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )

	    	}
	    }
	});

	$('#addfamOECprovO').val(pid);

})

$('#addfamOECcity').change(function(){

	$('#addfamOECcityO').val($(this).val())

	var cid = $(this).val()

	var datas = {
		cid 	: cid	
	};

	$('#addfamOECbrgy').empty().append(
		"<option value=''>-- Select Barangay --</option>"
	);

	$('#addfamOECbrgyO').empty().append(
		"<option value=''>-- Select Barangay --</option>"
	);


	$.getJSON("/Pages/getAllOriginBrgy",datas,function(a){

		for(var t in a){
			$('#addfamOECbrgy').append(
				"<option value='"+a[t].id+"'>"+a[t].brgy_name+"</option>"
			);

			$('#addfamOECbrgyO').append(
				"<option value='"+a[t].id+"'>"+a[t].brgy_name+"</option>"
			);

		}

		$('#addfamOECbrgy').append(
			"<option value='0'>NOT INDICATED</option>"
		);

		$('#addfamOECbrgyO').append(
			"<option value='OTHERS'>OTHERS</option>"
		);

	});


})

$('#addfamOECcityO').change(function(){

	var cid = $(this).val()

	var datas = {
		cid 	: cid	
	};


	$('#addfamOECbrgyO').empty().append(
		"<option value=''>-- Select Barangay --</option>"
	);


	$.getJSON("/Pages/getAllOriginBrgy",datas,function(a){

		for(var t in a){

			$('#addfamOECbrgyO').append(
				"<option value='"+a[t].id+"'>"+a[t].brgy_name+"</option>"
			);

		}

		$('#addfamOECbrgyO').append(
			"<option value='OTHERS'>OTHERS</option>"
		);

	});


})

$('#addfamOECbrgy').change(function(){

	$('#addfamOECbrgyO').val($(this).val())

	if($('#addfamOECbrgyO').val() == "OTHERS"){
		$('#addfamOECbrgyOothers').prop("disabled",false);
	}else{
		$('#addfamOECbrgyOothers').prop("disabled",true);
	}

})

$('#addfamOECbrgyO').change(function(){

	if($(this).val() == "OTHERS"){
		$('#addfamOECbrgyOothers').prop("disabled",false);
	}else{
		$('#addfamOECbrgyOothers').prop("disabled",true);
	}

})

$('#addcasualtyprov').change(function(){

	var pid = $('#addcasualtyprov').val();	

	$('#addcasualtycity').empty();
	$('#addcasualtycity').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#addcasualtycity').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})

$('#province_dam_per_brgy').change(function(){

	var pid = $('#province_dam_per_brgy').val();	

	$('#city_dam_per_brgy').empty();
	$('#city_dam_per_brgy').append(
	    "<option value=''>-- Select City/Municipality --</option>"
	);

	$.getJSON("/Pages/get_municipality",function(a){  
	    for(var i in a){
	    	if(pid == a[i].provinceid){
	    		$('#city_dam_per_brgy').append(
			        "<option value='"+a[i].id+"'>"+a[i].municipality_name+"</option>"
			    )
	    	}
	    }
	});

})


$('#savedata_mswd').click(function(){

	var datas = {
		fullname 	: $('#fullname').val(),
		mayor		: $('#mayor').val(),
		vmayor		: $('#vmayor').val(),
		province 	: $('#province').val(),
		city 		: $('#city').val(),
		mobile 		: $('#mobile').val(),
		telephone 	: $('#telephone').val(),
		emailadd 	: $('#emailadd').val()
	}

	$.getJSON("/Pages/insert_mswdo",datas,function(a){  
	    if(a == 1){
	    	alerts();
	    	get_mswdo();
	    	resetAll();
	    }else{
	    	alert("Database error!");
	    }
	});

})

function passmswdData(e){

	var datas = {
		id : e
	}

	mswdid = e;
	
	$.getJSON("/Pages/get_mswdinfo",datas,function(a){  

	    for(var i in a){
	      	$('#fullname').val(a[i].fullname);
			$('#mayor').val(a[i].mayor);
			$('#vmayor').val(a[i].vmayor);
			$('#province').val(a[i].province_id);

			$.getJSON("/Pages/get_municipality",function(rs){  
				$('#city').empty();
			    for(var j in rs){
			    	if(a[i].province_id == rs[j].provinceid){
			    		$('#city').append(
					        "<option value='"+rs[j].id+"'>"+rs[j].municipality_name+"</option>"
					    )
			    	}
			    }

			    $('#city').val(a[i].municipality_id);
			});

			$('#mobile').val(a[i].mobile);
			$('#telephone').val(a[i].telephone);
			$('#emailadd').val(a[i].emailaddress);	

	    }

	    enablebuttons();

	});

}

$('#updatedata_mswd').click(function(){

	var datas = {
		id 			: mswdid,
		fullname 	: $('#fullname').val(),
		mayor		: $('#mayor').val(),
		vmayor		: $('#vmayor').val(),
		province 	: $('#province').val(),
		city 		: $('#city').val(),
		mobile 		: $('#mobile').val(),
		telephone 	: $('#telephone').val(),
		emailadd 	: $('#emailadd').val()
	};

	$.getJSON("/Pages/update_mswd",datas,function(a){  
		if(a == 1){
			alerts();
			get_mswdo();
	    	resetAll();
		}else{
			alert("Database error!");
		}
	});

});

$('#deletedata_mswd').click(function(){

	var datas = {
		id 	: mswdid
	};

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Are you sure you want to delete this data? This action cannot be undone.',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/delete_mswd",datas,function(a){
	    				$.alert('Data successfully deleted!');
	    				get_mswdo();
	                	resetAll();
	    			});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue'
	    	}
	    }
	});

});

// MAT Leader Function =================================================================================================================================================

function get_matleader(){

	$('#tbl_cmatleader tbody').empty();

	$.getJSON("/Pages/get_matleader",function(a){  
		// title='Click on each row to edit/delete data' onclick='passmatleaderData("+a[i].id+")'
		for(var i in a){
	      $('#tbl_cmatleader tbody').append(
	          "<tr style='cursor:pointer'>"+
	          	"<td style='font-size:13px; width:200px'>"+a[i].province_name.toUpperCase()+"</td>"+
	          	"<td style='font-size:13px; width:250px'>"+a[i].municipality_name.toUpperCase()+"</td>"+
	          	"<td style='font-size:13px; width:270px'>"+a[i].fullname.toUpperCase()+"</td>"+
	          	"<td style='font-size:13px; width:250px'>"+a[i].position.toUpperCase()+"</td>"+
	          	"<td style='font-size:13px'>"+a[i].program.toUpperCase()+"</td>"+
	          	"<td style='font-size:13px'>"+a[i].gender.toUpperCase()+"</td>"+
	          	"<td style='font-size:13px'>"+isnull((a[i].contact.length < 11 ? "0"+a[i].contact.replace(/[^a-zA-Z0-9;]/g, '') : a[i].contact.replace(/[^a-zA-Z0-9;]/g, '')))+"</td>"+
	          	"<td style='font-size:13px'>"+a[i].email_add+"</td>"+
	          	"<td style='font-size:13px; width:200px'>"+a[i].designation.toUpperCase()+"</td>"+
	          "</tr>"
	      )
	    }

	    $('#tbl_cmatleader .filters td').each( function () {
	        var title = $('#tbl_cmatleader thead th').eq( $(this).index() ).text();
	        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	    } );
 

	    var dtable = $('#tbl_cmatleader').DataTable({
	    	pageLength 		: 17,
	    	bLengthChange 	: !1,
	    	bSort 			: !1
	    });

	    dtable.columns().eq( 0 ).each( function ( colIdx ) {
	        $( 'input', $('.filters td')[colIdx] ).on( 'keyup change', function () {
	            dtable
	                .column( colIdx )
	                .search( this.value )
	                .draw();
	        } );
	    } );

	    $('#tbl_cmatleader_filter').hide();

	});

	$.getJSON("/Pages/get_pats",function(a){
		for(var i in a){
			$('#tbl_patleader tbody').append(
		          "<tr style='cursor:pointer'>"+
		          	"<td style='font-size:13px; width:200px'>"+a[i].province_name.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px; width:270px'>"+a[i].fullname.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px; width:250px'>"+a[i].position.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px'>"+a[i].program.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px'>"+isnull((a[i].contact.length < 11 ? "0"+a[i].contact.replace(/[^a-zA-Z0-9;]/g, '') : a[i].contact.replace(/[^a-zA-Z0-9;]/g, '')))+"</td>"+
		          	"<td style='font-size:13px'>"+a[i].email_add+"</td>"+
		          	"<td style='font-size:13px; width:200px'>"+a[i].designation.toUpperCase()+"</td>"+
		          "</tr>"
		      )
		}

		$('#tbl_patleader .filters1 td').each( function () {
	        var title = $('#tbl_patleader thead th').eq( $(this).index() ).text();
	        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	    } );
 

	    var dtable = $('#tbl_patleader').DataTable({
	    	pageLength 		: 17,
	    	bLengthChange 	: !1,
	    	bSort 			: !1
	    });

	    dtable.columns().eq( 0 ).each( function ( colIdx ) {
	        $( 'input', $('.filters1 td')[colIdx] ).on( 'keyup change', function () {
	            dtable
	                .column( colIdx )
	                .search( this.value )
	                .draw();
	        } );
	    } );

	    $('#tbl_patleader_filter').hide();

	});

	$.getJSON("/Pages/get_ldrrmos",function(a){
		for(var i in a){
			$('#tbl_ldrrmo tbody').append(
		          "<tr style='cursor:pointer'>"+
		          	"<td style='font-size:13px; width:200px'>"+a[i].province_name.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px; width:270px'>"+a[i].municipality_name.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px; width:270px'>"+a[i].fullname.toUpperCase()+"</td>"+
		          	"<td style='font-size:13px; width:250px'>"+a[i].telnum+"</td>"+
		          	"<td style='font-size:13px'>"+a[i].faxnum+"</td>"+
		          	"<td style='font-size:13px'>"+isnull((a[i].contact.length < 11 ? "0"+a[i].contact.replace(/[^a-zA-Z0-9;]/g, '') : a[i].contact.replace(/[^a-zA-Z0-9;]/g, '')))+"</td>"+
		          	"<td style='font-size:13px'>"+a[i].email_add+"</td>"+
		          "</tr>"
		      )
		}

		$('#tbl_ldrrmo .filters2 td').each( function () {
	        var title = $('#tbl_ldrrmo thead th').eq( $(this).index() ).text();
	        $(this).html( '<input type="text" placeholder="Search '+title+'" />' );
	    } );
 

	    var dtable = $('#tbl_ldrrmo').DataTable({
	    	pageLength 		: 17,
	    	bLengthChange 	: !1,
	    	bSort 			: !1
	    });

	    dtable.columns().eq( 0 ).each( function ( colIdx ) {
	        $( 'input', $('.filters2 td')[colIdx] ).on( 'keyup change', function () {
	            dtable
	                .column( colIdx )
	                .search( this.value )
	                .draw();
	        } );
	    } );

	    $('#tbl_ldrrmo_filter').hide();

	});

}

$('#savedata_mat').click(function(){

	var datas = {
		fullname 			: $('#fullname').val(),
		position			: $('#position').val(),
		program				: $('#program').val(),
		gender				: $('#gender').val(),
		yearinservice 		: $('#yearinservice').val(),
		course 				: $('#course').val(),
		provinceid 			: $('#province').val(),
		municipalityid 		: $('#city').val(),
		mobile 				: $('#mobile').val(),
		emailaddress 		: $('#emailadd').val(),
		isleader 			: 't'
	};

	$.getJSON("/Pages/insert_matleader",datas,function(a){  
		if(a == 1){
			alerts();
			get_matleader();
			resetAllMAT();
		}
	});

});

function passmatleaderData(e){

	var datas = {
		id : e
	}

	matleaderid = e;

	$.getJSON("/Pages/get_matleaderinfo",datas,function(a){

		for(var i in a){
			$('#fullname').val(a[i].fullname);
			$('#position').val(a[i].position);
			$('#program').val(a[i].program);
			$('#gender').val(a[i].gender);
			$('#yearinservice').val(a[i].yearinservice);
			$('#course').val(a[i].course);
			$('#province').val(a[i].provinceid);

			$.getJSON("/Pages/get_municipality",function(rs){  
				$('#city').empty();
			    for(var j in rs){
			    	if(a[i].provinceid == rs[j].provinceid){
			    		$('#city').append(
					        "<option value='"+rs[j].id+"'>"+rs[j].municipality_name+"</option>"
					    )
			    	}
			    }

			    $('#city').val(a[i].municipalityid);
			});

			$('#mobile').val(a[i].mobile);
			$('#emailadd').val(a[i].emailaddress);
		}

		enablebuttonsMAT();

	});

}

$('#deletedata_mat').click(function(){

	var datas = {
		id : matleaderid
	}

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Are you sure you want to delete this data? This action cannot be undone.',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/delete_matleader",datas,function(a){
	    				$.alert({
		                	title : '',
		                	content : 'Data successfully deleted!',
		                	buttons: {
		                		a: {
		                			text: '<i class="fa fa-check"></i> Okay',
		    						btnClass: 'btn-dark',
		                		}
		                	}
		                });
	    				get_matleader();
	                	resetAllMAT();
	    			});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue',
	    		action : function(){
	    			resetAllMAT();
	    		}
	    	}
	    }
	});
})

$('#updatedata_mat').click(function(){

	var datas = {
		id 					: matleaderid,
		fullname 			: $('#fullname').val(),
		position			: $('#position').val(),
		program				: $('#program').val(),
		gender				: $('#gender').val(),
		yearinservice 		: $('#yearinservice').val(),
		course 				: $('#course').val(),
		provinceid 			: $('#province').val(),
		municipalityid 		: $('#city').val(),
		mobile 				: $('#mobile').val(),
		emailaddress 		: $('#emailadd').val()
	};

	$.getJSON("/Pages/update_matleader",datas,function(a){  
		if(a == 1){
			alerts();
			get_matleader();
			resetAllMAT();
		}else{
			alert("Database error!");
		}
	});

});


// CMAT Member Function=====================================================================================================================================================================

// function get_matmember(){

// 	if(dtable){
// 		dtable.destroy();
// 	}

// 	$('#tbl_cmatmember tbody').empty();

// 	$.getJSON("/Pages/get_matmember",function(a){  

// 		for(var i in a){
// 	      $('#tbl_cmatmember tbody').append(
// 	          "<tr style='cursor:pointer' title='Click on each row to edit/delete data' onclick='passmatmemberData("+a[i].id+")'>"+
// 	          	"<td style='font-size:10px'>"+a[i].fullname+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].position+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].program+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].gender+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].province_name+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].municipality_name+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].mobile+"</td>"+
// 	          	"<td style='font-size:10px'>"+a[i].emailaddress+"</td>"+
// 	          "</tr>"
// 	      )
// 	    }

// 	    dtable = $('#tbl_cmatmember').DataTable();

// 	});

// }

$('#savedata_matmember').click(function(){

	var datas = {
		fullname 			: $('#fullname').val(),
		position			: $('#position').val(),
		program				: $('#program').val(),
		gender				: $('#gender').val(),
		yearinservice 		: 0,
		course 				: 'NA',
		provinceid 			: $('#province').val(),
		municipalityid 		: $('#city').val(),
		mobile 				: $('#mobile').val(),
		emailaddress 		: $('#emailadd').val(),
		isleader 			: 'f'
	};

	$.getJSON("/Pages/insert_matleader",datas,function(a){  
		if(a == 1){
			alerts();
			get_matmember();
			resetAllMAT();
		}
	});

});

function passmatmemberData(e){

	var datas = {
		id : e
	}

	matleaderid = e;

	$.getJSON("/Pages/get_matleaderinfo",datas,function(a){

		for(var i in a){
			$('#fullname').val(a[i].fullname);
			$('#position').val(a[i].position);
			$('#program').val(a[i].program);
			$('#gender').val(a[i].gender);
			$('#province').val(a[i].provinceid);

			$.getJSON("/Pages/get_municipality",function(rs){  
				$('#city').empty();
			    for(var j in rs){
			    	if(a[i].provinceid == rs[j].provinceid){
			    		$('#city').append(
					        "<option value='"+rs[j].id+"'>"+rs[j].municipality_name+"</option>"
					    )
			    	}
			    }

			    $('#city').val(a[i].municipalityid);
			});

			$('#mobile').val(a[i].mobile);
			$('#emailadd').val(a[i].emailaddress);
		}

		enablebuttonsMATMEMBER();

	});

}


$('#updatedata_matmember').click(function(){

	var datas = {
		id 					: matleaderid,
		fullname 			: $('#fullname').val(),
		position			: $('#position').val(),
		program				: $('#program').val(),
		gender				: $('#gender').val(),
		yearinservice 		: 0,
		course 				: '',
		provinceid 			: $('#province').val(),
		municipalityid 		: $('#city').val(),
		mobile 				: $('#mobile').val(),
		emailaddress 		: $('#emailadd').val(),
		isleader 			: 'f'
	};

	$.getJSON("/Pages/update_matleader",datas,function(a){  
		if(a == 1){
			alerts();
			get_matmember();
			resetAllMATMEMBER();
		}else{
			alert("Database error!");
		}
	});

});

$('#deletedata_matmember').click(function(){

	var datas = {
		id : matleaderid
	}

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Are you sure you want to delete this data? This action cannot be undone.',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/delete_matleader",datas,function(a){
	    				$.alert({
		                	title : '',
		                	content : 'Data successfully deleted!',
		                	buttons: {
		                		a: {
		                			text: '<i class="fa fa-check"></i> Okay',
		    						btnClass: 'btn-dark',
		                		}
		                	}
		                });
	    				get_matmember();
	                	resetAllMATMEMBER();
	    			});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue',
	    		action : function(){
	    			resetAllMATMEMBER();
	    		}
	    	}
	    }
	});
})

// Select Contacts=======================================================================================================================================================================

$('#selectcontact').change(function(){

	var e = $(this).val();

	$('#tbl_selectcontact tbody').empty();

	if(e != ""){
		if(e == 1){
			$.getJSON("/Pages/get_mswdo",function(a){  
				for(var i in a){
					$('#tbl_selectcontact tbody').append(
						"<tr>"+
							"<td style='text-align:center'><input type='checkbox' name='numbers' value='"+a[i].mobile+"' onclick='passNumber()'></td>"+
							"<td>"+a[i].fullname+"</td>"+
							"<td>"+a[i].municipality_name+"</td>"+
							"<td>"+a[i].mobile+"</td>"+
						"</tr>"
					)
				}
			});
		}else if(e == 2){
			$.getJSON("/Pages/get_matleader",function(a){  
				for(var i in a){
					$('#tbl_selectcontact tbody').append(
						"<tr>"+
							"<td style='text-align:center'><input type='checkbox' name='numbers' value='"+a[i].mobile+"' onclick='passNumber()'></td>"+
							"<td>"+a[i].fullname+"</td>"+
							"<td>"+a[i].municipality_name+"</td>"+
							"<td>"+a[i].mobile+"</td>"+
						"</tr>"
					)
				}
			});
		}else{
			$.getJSON("/Pages/get_matmember",function(a){  
				for(var i in a){
					$('#tbl_selectcontact tbody').append(
						"<tr>"+
							"<td style='text-align:center'><input type='checkbox' name='numbers' value='"+a[i].mobile+"' onclick='passNumber()'></td>"+
							"<td>"+a[i].fullname+"</td>"+
							"<td>"+a[i].municipality_name+"</td>"+
							"<td>"+a[i].mobile+"</td>"+
						"</tr>"
					)
				}
			});
		}
	}else{
		$('#tbl_selectcontact tbody').empty();
	}

})

$('#checkallnumber').click(function(){

	var e = $('[name="numbers"]');

	var str = "";

	if($(this).is(':checked') == 1){

		for(var i = 0 ; i < e.length ; i++){
			e[i].checked = 1;
		}

		for(var i = 0 ; i < e.length ; i++){
			if(e[i].checked == 1){
				if(e[i].value != ""){
					str = str + e[i].value + ";";
				}
			}
		}

		$('#allnumbers').val(str);

	}else{
		for(var i = 0 ; i < e.length ; i++){
			e[i].checked = 0;
			$('#allnumbers').val('');
		}
	}

});

function passNumber(){

	var e = $('[name="numbers"]');

	var str = "";

	for(var i = 0 ; i < e.length ; i++){
		if(e[i].checked == 1){
			if(e[i].value != ""){
				str = str + e[i].value + ";";
			}
		}
	}

	$('#allnumbers').val(str);
}	


// New Dromic =============================================================================================================================================================

function getDisaster(){

	$('#tbl_disaster tbody').empty();

	newreptitle = [];

	var datas = {
		usernameid : $('#usernameid').text()
	}

	$.getJSON("/Pages/getdisaster",datas,function(a){

		for(var i in a){
			if(Number(a[i].tcount) == 0){
				var disabled = "0";
				var dis = "disabled";
			}else{
				var disabled = "disabled";
				var dis = "0";
			}

			newreptitle.push({
				id 		: a[i].id,
				title 	: a[i].disaster_name
			})

			$('#tbl_disaster tbody').append(
				"<tr>"+
					"<td>"+a[i].disaster_name+"</td>"+
					"<td style='text-align:center'>"+todate(a[i].disaster_date)+"</td>"+
					"<td style='width:50%'>"+
						"<button type='button' class='btn btn-danger btn-xs' "+disabled+" data-toggle='tooltip' title='Create new DROMIC statistical report' onclick='addnewReport("+a[i].id+")'> <i class='fa fa-plus-circle'></i> Create New Report</button>"+
						"<button type='button' class='btn btn-primary btn-xs' onclick='viewDetailsPrev("+a[i].maxid+")' "+dis+" data-toggle='tooltip' title='Load latest report to update details and save as new record'><i class='fa fa-cogs'></i> Load Latest Report</button>"+
						"<button type='button' class='btn btn-success btn-xs' onclick='viewPrevious("+a[i].id+")' "+dis+" data-toggle='tooltip' title='View previously made reports'><i class='fa fa-eye'></i> View Previous Reports</button>"+
					"</td>"+
				"<tr>"
			)


			var d = new Date(a[i].disaster_date);

			var d2 = new Date();



			if(d.getFullYear() == d2.getFullYear()){

				$('#current_situations').append(
				    "<li style='font-size:20px'>"+
			            "<div class='block'>"+
			              "<div class='block_content'>"+
			                "<h2 class='title'>"+
			                    "<a style='font-size:13px; cursor:pointer' data-toggle='tooltip' title='Click to view latest report.' onclick='viewDetailsPrev("+a[i].maxid+")'>"+a[i].disaster_name+"</a>"+
			                "</h2>"+
			              "</div>"+
			            "</div>"+
			        "</li>"
				)
			}

		}


		$('[data-toggle="tooltip"]').tooltip();


	})

};

$('#addDromic').click(function(){

	var datas = {
		disaster_name 		: $('#disaster_name').val(),
		disaster_date 		: $('#disaster_date').val(),
		created_by_user 	: $('#usernameid').text()
	};


	if(datas.disaster_name == "" || datas.disaster_date == ""){
		$.confirm({
		    title: 'Warning',
		    content: '<i class="fa fa-info-circle"></i> Disaster Name and Disaster Date must not be blank!',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-times-circle-o"></i> Close',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		$.getJSON("/Pages/addnew_disaster",datas,function(a){  
			if(a == 1){
				alerts();
				getDisaster();
				$('#disaster_name').val('');
				$('#disaster_date').val('');
			}
		});
	}

})

// Send SMS ===========================================================================================================================================================

$('#sendsms').click(function(){

	var numbers = $('#allnumbers').val();

	if(numbers == ""){
		alertnoNumber();
	}else{

		numbers = numbers.split(';');

		jQuery.each(numbers, function(i) {
		    setTimeout(function() {
		        var datas = {
					number 	: numbers[i],
					body 	: $('#smsbody').val() + " " + $('#postsmsbody').val()
				}

				$.getJSON("/Pages/sendsms",datas,function(a){})
		    }, 2000*i);
		});

		$('#sendsmsModal').modal('show');

		setTimeout(function() {
	        $('#sendsmsModal').modal('hide');
	    }, 2000*numbers.length);
	}

});


var chart_affprov = [];
var chart_affprovdrill = [];
var chart_affmunisall = [];

function get_narrative_report(){

	var datas = {

		id : URLID()

	}

	$.getJSON("/Pages/get_narrative_report",datas,function(a){

		if(a == 0){
			console.log("No narrative report");
		}else{

			$('#frame_narrative_report').attr('src',a.narrative_report[0].file);

		}

	});


}

function get_dromic(n){
	var datum = {
		username 	: $('#usernameid').text(),
		id 			: n
	}


	$('#saveasnewrecord').hide();
	$('#addfamiecs').hide();
	$('#adddamass').hide();
	$('#addfamoec').hide();
	$('#addcasualtybtn').hide();
	//$('#exporttoexcel').hide();
	$('#savedata_dam_per_brgy').hide();
	$('#updatedata_dam_per_brgy').hide();
	$('#saveassistance').hide();

	$('#can_edit').text('f');

	get_narrative_report();

	$.getJSON("/Pages/get_can_view",datum,function(a){

		if(a == 0){

			$.confirm({
			    title: '<span class="red">Warning!</span>',
			    content: 'You\'re not allowed to perform this action. Kinly contact the administrator.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Yes',
			    		btnClass: 'btn-red',
			    		action: function(){
			    			window.location.href = "/drrrou_dev/dashboard";
			        }
			    	}
			    }
			});

		}else{


			$.getJSON("/Pages/get_can_edit",datum,function(a){

				if(a == 0){

					$('#saveasnewrecord').hide();
					$('#addfamiecs').hide();
					$('#adddamass').hide();
					$('#addfamoec').hide();
					$('#addcasualtybtn').hide();
					//$('#exporttoexcel').hide();
					$('#savedata_dam_per_brgy').hide();
					$('#updatedata_dam_per_brgy').hide();
					$('#saveassistance').hide();

					$('#can_edit').text('f');

				}else{

					$('#saveasnewrecord').show();
					$('#addfamiecs').show();
					$('#adddamass').show();
					$('#addfamoec').show();
					$('#addcasualtybtn').show();
					$('#exporttoexcel').show();
					$('#savedata_dam_per_brgy').show();
					$('#saveassistance').show();

					$('#can_edit').text('t');

				}

			});

			get_comments();

			var datas = {
				id : n
			}

			var t = 0;

			$.getJSON("/Pages/get_evac_stats",datas,function(a){

				rs = a;	
				$('#loader').hide();


				$("#evac_stats tbody").empty();

				var nopen = 0;
				var exist = 0;
				var close = 0;
				var reactivated = 0;

				for(var ki in rs.rs){
					if(rs.rs[ki].ec_status == "Newly-Opened"){
						nopen += 1;
					}
					if(rs.rs[ki].ec_status == "Existing"){
						exist += 1;
					}
					if(rs.rs[ki].ec_status == "Closed"){
						close += 1;
					}
					if(rs.rs[ki].ec_status == "Re-activated"){
						reactivated += 1;
					}
				}

				$('#count_ec').empty();

				$('#count_ec').append("| # of Newly-Opened ECs: " + nopen);
				$('#count_ec').append("<br>| # of Existing ECs: " + exist);
				$('#count_ec').append("<br>| # of ECs closed: " + close);
				$('#count_ec').append("<br>| # of ECs reactivated: " + reactivated);


				for(var al = 0 ; al < rs.query_all_munis.length ; al++){
					if(rs.query_all_munis[al].iscity == 't'){

						$('#count_allcity').empty().append(isnull(rs.query_all_munis[al].all_munis));

					}else{

						$('#count_allmunis').empty().append(isnull(rs.query_all_munis[al].all_munis));

					}
				}

				$("#evac_stats tbody").append(
					"<tr style='color:#fff;'>"+
						"<th style='border: 1px solid #000; text-align:left; padding:2px; background-color: #808080; color: #000' border='1'><b>"+REGION+"</b></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' id='caraga_ec_cum'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' id='caraga_ec_now'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' ></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' ></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' id='caraga_fam_cum'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' id='caraga_fam_now'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' id='caraga_per_cum'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000' id='caraga_per_now'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #808080; color: #000'></th>"+
					"</tr>"
				);

				$("#evac_stats_outside tbody").empty();
				$("#tbl_masterquery tbody").empty();
				$('#tbl_casualty_asst tbody').empty();

				$("#evac_stats_outside tbody").append(
					"<tr style='background-color:#808080; color:#000'>"+
						"<th style='border: 1px solid #000; text-align:left; padding:2px;'><b>"+REGION+"</b></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px' id='caraga_fam_cum_o'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px' id='caraga_fam_now_o'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px' id='caraga_per_cum_o'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px' id='caraga_per_now_o'></th>"+
						"<th style='border: 1px solid #000; text-align:center; padding:2px'></th>"+
					"</tr>"
				);

				$("#tbl_casualty_asst tbody").append(
					"<tr style='background-color:#AC2925; color:#fff'>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:left; padding:2px'><b>"+REGION+"</b></th>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:center; padding:2px' id='caraga_tot_c'></th>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:center; padding:2px' id='caraga_part_c'></th>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:right; padding-right: 5px' id='caraga_total_c'></th>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:right; padding-right: 5px' id='caraga_dswd_c'></th>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:right; padding-right: 5px' id='caraga_lgu_c'></th>"+
						"<th style='border: 1px solid #000; background-color: #A6A6A6; color: #000; text-align:right; padding-right: 5px' id='caraga_ngo_c'></th>"+
					"</tr>"
				);

				$('#tbl_materquery_summary tbody').empty();
				$('#tbl_evac_summary tbody').empty();
				$('#tbl_evac_outside_summary tbody').empty();
				$('#tbl_damaged_summary tbody').empty();
				$('#tbl_displaced_summary tbody').empty();

				for(var qt in rs.query_title){

					$('#asofdate').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime').text("Time: " + rs.query_title[qt].asoftime);
					$('#asofdate2').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime2').text("Time: " + rs.query_title[qt].asoftime);

					$('#asofdate_summary').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime_summary').text("Time: " + rs.query_title[qt].asoftime);


					$('#disastertype').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));
					$('#disastertype2').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate2').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));

					$('#disastertype_summary').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate_summary').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));

					$('#asofdate_IEC').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime_IEC').text("Time: " + rs.query_title[qt].asoftime);
					$('#disastertype_IEC').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate_IEC').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));

					$('#asofdate_OEC').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime_OEC').text("Time: " + rs.query_title[qt].asoftime);
					$('#disastertype_OEC').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate_OEC').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));

					$('#asofdate_SEX').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime_SEX').text("Time: " + rs.query_title[qt].asoftime);
					$('#disastertype_SEX').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate_SEX').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));

					$('#asofdate_sex_summary').text("As of " + todate(rs.query_title[qt].ddate));
					$('#asoftime_sex_summary').text("Time: " + rs.query_title[qt].asoftime);
					$('#disastertype_sex_summary').text('Disaster Type: ' + rs.query_title[qt].disaster_name);
					$('#disasterdate_sex_summary').text('Date of Occurence: ' + todate(rs.query_title[qt].disaster_date));

					asof = todatesave(rs.query_title[qt].ddate,rs.query_title[qt].asoftime);

					$('#spreparedby').text(rs.query_title[qt].preparedby);
					$('#srecommendedby').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos').text(rs.query_title[qt].approvedbypos);

					$('#spreparedby_summary').text(rs.query_title[qt].preparedby);
					$('#srecommendedby_summary').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby_summary').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos_summary').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos_summary').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos_summary').text(rs.query_title[qt].approvedbypos);

					$('#spreparedby_sex_summary').text(rs.query_title[qt].preparedby);
					$('#srecommendedby_sex_summary').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby_sex_summary').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos_sex_summary').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos_sex_summary').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos_sex_summary').text(rs.query_title[qt].approvedbypos);

					$('#spreparedby2').text(rs.query_title[qt].preparedby);
					$('#srecommendedby2').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby2').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos2').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos2').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos2').text(rs.query_title[qt].approvedbypos);

					$('#spreparedby3').text(rs.query_title[qt].preparedby);
					$('#srecommendedby3').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby3').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos3').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos3').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos3').text(rs.query_title[qt].approvedbypos);

					$('#spreparedby4').text(rs.query_title[qt].preparedby);
					$('#srecommendedby4').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby4').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos4').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos4').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos4').text(rs.query_title[qt].approvedbypos);

					$('#spreparedby5').text(rs.query_title[qt].preparedby);
					$('#srecommendedby5').text(rs.query_title[qt].recommendedby);
					$('#sapprovedby5').text(rs.query_title[qt].approvedby);
					$('#spreparedbypos5').text(rs.query_title[qt].preparedbypos);
					$('#srecommendedbypos5').text(rs.query_title[qt].recommendedbypos);
					$('#sapprovedbypos5').text(rs.query_title[qt].approvedbypos);

				}

		// Inside Evacuation Areas ============================================================================================================================================

				for(i = 0 ; i < provinces.length ; i++){

						var fam_cum = "";
						var fam_now = "";
						var per_cum = "";
						var per_now = "";
						var fc 		= 0;
						var fn 		= 0;
						var pc 		= 0;
						var pn 		= 0;
						var ec_cum 	= 0;
						var ec_now 	= 0;

						for(var m in rs.rs){
							if(rs.rs[m].provinceid == provinces[i].id){

								fam_cum = isnulls(rs.rs[m].family_cum);
								fam_cum = fam_cum.split("/");

								fam_now = isnulls(rs.rs[m].family_now);
								fam_now = fam_now.split("/");

								per_cum = isnulls(rs.rs[m].person_cum);
								per_cum = per_cum.split("/");

								per_now = isnulls(rs.rs[m].person_now);
								per_now = per_now.split("/");

								ec_cum += Number(rs.rs[m].ec_cum);
								ec_now += Number(rs.rs[m].ec_now);

								for(k = 0 ; k < fam_cum.length ; k++){
									fc += Number(fam_cum[k]);
								}

								for(l = 0 ; l < fam_now.length ; l++){
									fn += Number(fam_now[l]);
								}

								for(p = 0 ; p < per_cum.length ; p++){
									pc += Number(per_cum[p]);
								}

								for(q = 0 ; q < per_now.length ; q++){
									pn += Number(per_now[q]);
								}

							}
						}

						if(Number(ec_cum) > 0  || Number(fc) > 0 ||  Number(pc) > 0 ){

							$("#evac_stats tbody").append(
								"<tr style='background-color:yellow; cursor:pointer'>"+
									"<th style='border: 1px solid #000; padding:2px; text-align:left; background-color: #A6A6A6; color: #000'>   "+provinces[i].name+"</th>"+
									"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'>"+addComma(isnull(ec_cum))+"</th>"+
						  			"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'>"+addComma(isnull(ec_now))+"</th>"+
						  			"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'></th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'></th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'>"+addComma(isnull(fc))+"</th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'>"+addComma(isnull(fn))+"</th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'>"+addComma(isnull(pc))+"</th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'>"+addComma(isnull(pn))+"</th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'></th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'></th>"+
				  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #A6A6A6; color: #000'></th>"+
								"</tr>"
							)
						}

						for(var n  in rs.city){
							if(rs.city[n].provinceid == provinces[i].id){

								var fam_cum = "";
								var fam_now = "";
								var per_cum = "";
								var per_now = "";
								var fc 		= 0;
								var fn 		= 0;
								var pc 		= 0;
								var pn 		= 0;
								var ec_cum 	= 0;
								var ec_now 	= 0;

								var brgy_ec 	= "";

								for(var m in rs.rs){
									if(rs.city[n].id == rs.rs[m].municipality_id){

										fam_cum = isnulls(rs.rs[m].family_cum);
										fam_cum = fam_cum.split("/");

										fam_now = isnulls(rs.rs[m].family_now);
										fam_now = fam_now.split("/");

										per_cum = isnulls(rs.rs[m].person_cum);
										per_cum = per_cum.split("/");

										per_now = isnulls(rs.rs[m].person_now);
										per_now = per_now.split("/");

										ec_cum += Number(rs.rs[m].ec_cum);
										ec_now += Number(rs.rs[m].ec_now);

										for(k = 0 ; k < fam_cum.length ; k++){
											fc += Number(fam_cum[k]);
										}

										for(l = 0 ; l < fam_now.length ; l++){
											fn += Number(fam_now[l]);
										}

										for(p = 0 ; p < per_cum.length ; p++){
											pc += Number(per_cum[p]);
										}

										for(q = 0 ; q < per_now.length ; q++){
											pn += Number(per_now[q]);
										}

									}
								}

								if(Number(ec_cum) > 0 || Number(fc) > 0 || Number(pc) > 0 ){

									$("#evac_stats tbody").append(
										"<tr style='background-color:#169F85; color:#fff; cursor:pointer' class='contextmenu_click_ec_tab contextmenu_click_ec_tab."+rs.city[n].id+"'>"+
											"<th style='border: 1px solid #000; padding:2px; font-weight:bold; text-align:left; background-color: #BFBFBF; color: #000' border='0.5'>       "+rs.city[n].municipality_name+"</th>"+
											"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'>"+addComma(isnull(ec_cum))+"</th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'>"+addComma(isnull(ec_now))+"</th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'></th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'></th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'>"+addComma(isnull(fc))+"</th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'>"+addComma(isnull(fn))+"</th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'>"+addComma(isnull(pc))+"</th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'>"+addComma(isnull(pn))+"</th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'></th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'></th>"+
						  					"<th style='border: 1px solid #000; text-align:center; padding:2px; background-color: #BFBFBF; color: #000'></th>"+
										"</tr>"
									)
								}

								for(var m in rs.rs){
									if(rs.city[n].id == rs.rs[m].municipality_id){
										if(m > 0){

											// convert ec name to "dash" if ec name is same as previous

											if((rs.rs[m].evacuation_name.toLowerCase() == rs.rs[m-1].evacuation_name.toLowerCase()) && (rs.rs[m].municipality_id == rs.rs[m-1].municipality_id)){
												var evac = "";
											}else{
												var evac = rs.rs[m].evacuation_name;
											}
										}else{
											var evac = rs.rs[m].evacuation_name;
										}

										if(m > 0){

											// convert barangay name to "dash" if brgy name is same as previous

											if((rs.rs[m].brgy_located_ec== rs.rs[m-1].brgy_located_ec) && (rs.rs[m].municipality_id == rs.rs[m-1].municipality_id) && (rs.rs[m].evacuation_name.toLowerCase() == rs.rs[m-1].evacuation_name.toLowerCase())){
												var brgy_ec = "";
											}else{
												for(var b = 0 ; b < rs.brgy.length ; b++){
													if(rs.brgy[b].id == rs.rs[m].brgy_located_ec){
														brgy_ec 	= rs.brgy[b].brgy_name;
														break;
													}
												}
											}
										}else{
											for(var b = 0 ; b < rs.brgy.length ; b++){
												if(rs.brgy[b].id == rs.rs[m].brgy_located_ec){
													brgy_ec 	= rs.brgy[b].brgy_name;
													break;
												}
											}
										}

										var brgy_evac = "";
										var blocated = "";

										if(rs.rs[m].brgy_located != null){

											var blocated = rs.rs[m].brgy_located.toString();
											blocated = blocated.split(",");

										}

										for(var bb = 0 ; bb < blocated.length ; bb++){

											for(var b = 0 ; b < rs.brgy.length ; b++){
											
												if(bb == 0){
													if(rs.brgy[b].id == blocated[bb]){

														if(rs.brgy[b].municipality_id != rs.rs[m].municipality_id){
															brgy_evac 	= rs.brgy[b].brgy_name + ", " + rs.brgy[b].municipality_name + ", " + rs.brgy[b].province_name;
														}else{
															brgy_evac = rs.brgy[b].brgy_name;
														}

													}
												}else{

													if(rs.brgy[b].id == blocated[bb]){

														if(rs.brgy[b].municipality_id != rs.rs[m].municipality_id){
															brgy_evac 	= brgy_evac + "<br>" + rs.brgy[b].brgy_name + ", " + rs.brgy[b].municipality_name + ", " + rs.brgy[b].province_name;
														}else{
															brgy_evac = brgy_evac + "<br>" + rs.brgy[b].brgy_name;
														}

													}
												}

											}


										}


										if(rs.rs[m].ec_status == "Closed"){
											var style = "background-color: #ADD8E6";
										}else if(rs.rs[m].ec_status == "Existing"){
											var style = "background-color: #F08080";
										}else if(rs.rs[m].ec_status == "Newly-Opened"){
											var style = "background-color: #F0E68C";
										}else{
											var style = "background-color: #FFF";
										}

										$("#evac_stats tbody").append(
											"<tr style='cursor:pointer' ondblclick='updateEC("+rs.rs[m].id+")' class='hoveredit'>"+
												"<td style='border: 1px solid #000; color: #000; padding:2px; "+style+"'></td>"+
												"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; "+style+"; font-size: 12px'>"+addComma(isnull(rs.rs[m].ec_cum))+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; "+style+"; font-size: 12px'>"+addComma(isnull(rs.rs[m].ec_now))+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; "+style+"; font-size: 12px'>"+isnull(brgy_ec)+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; "+style+"; font-size: 12px'>"+isnulldo(evac.toUpperCase())+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; "+style+"; font-size: 12px'>"+addComma(isnull(rs.rs[m].family_cum))+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; "+style+"; font-size: 12px'>"+addComma(isnull(rs.rs[m].family_now))+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; "+style+"; font-size: 12px'>"+addComma(isnull(rs.rs[m].person_cum))+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; "+style+"; font-size: 12px'>"+addComma(isnull(rs.rs[m].person_now))+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; "+style+"; font-size: 12px'>"+isnull(brgy_evac)+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; "+style+"; font-size: 12px'>"+rs.rs[m].ec_status+"</td>"+
							  					"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; "+style+"; font-size: 10px'>"+isnull(rs.rs[m].ec_remarks)+"</td>"+
											"</tr>"
										)
									}

									brgy_ec = "";
								}

							}
						}

				}

				var fam_cum = "";
				var fam_now = "";
				var per_cum = "";
				var per_now = "";
				var fc = 0;
				var fn = 0;
				var pc = 0;
				var pn = 0;
				var ec_cum = 0;
				var ec_now = 0;

				for(var m in rs.rs){

						fam_cum = isnulls(rs.rs[m].family_cum);
						fam_cum = fam_cum.split("/");

						fam_now = isnulls(rs.rs[m].family_now);
						fam_now = fam_now.split("/");

						per_cum = isnulls(rs.rs[m].person_cum);
						per_cum = per_cum.split("/");

						per_now = isnulls(rs.rs[m].person_now);
						per_now = per_now.split("/");

						ec_cum += Number(isnulls(rs.rs[m].ec_cum));
						ec_now += Number(isnulls(rs.rs[m].ec_now));

						for(k = 0 ; k < fam_cum.length ; k++){
							fc += Number(fam_cum[k]);
						}

						for(l = 0 ; l < fam_now.length ; l++){
							fn += Number(fam_now[l]);
						}

						for(p = 0 ; p < per_cum.length ; p++){
							pc += Number(per_cum[p]);
						}

						for(q = 0 ; q < per_now.length ; q++){
							pn += Number(per_now[q]);
						}
				}

				$('#caraga_ec_cum').text(addComma(ec_cum));
				$('#caraga_ec_now').text(addComma(ec_now));
				$('#caraga_fam_cum').text(addComma(fc));
				$('#caraga_fam_now').text(addComma(fn));
				$('#caraga_per_cum').text(addComma(pc));
				$('#caraga_per_now').text(addComma(pn));

		// ======== End Inside Evacuation Area ================================================================================================================================

				for(var i in provinces){

					var fam_cum_o_p = 0;
					var fam_now_o_p = 0;
					var per_cum_o_p = 0;
					var per_now_o_p = 0;

					for(var e in rs.rsoutside){
						if(rs.rsoutside[e].provinceid == provinces[i].id){

							fam_cum_o_p += Number(rs.rsoutside[e].family_cum);
							fam_now_o_p += Number(rs.rsoutside[e].family_now);
							per_cum_o_p += Number(rs.rsoutside[e].person_cum);
							per_now_o_p += Number(rs.rsoutside[e].person_now);

						}
					}

					if(Number(fam_cum_o_p) > 0 || Number(per_cum_o_p) > 0){

						$("#evac_stats_outside tbody").append(
							"<tr>"+
								"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; padding:2px; text-align: left'>   "+provinces[i].name+"</th>"+
								"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'></th>"+
			  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(fam_cum_o_p))+"</th>"+
			  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(fam_now_o_p))+"</th>"+
			  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(per_cum_o_p))+"</th>"+
			  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(per_now_o_p))+"</th>"+
			  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'></th>"+
							"</tr>"
						)
					}

					for(var r in rs.rsoutside){

						var fam_cum_o = 0;
						var fam_now_o = 0;
						var per_cum_o = 0;
						var per_now_o = 0;

						if(provinces[i].id == rs.rsoutside[r].provinceid){

							if(r == 0){

								for(var e in rs.rsoutside){
									if(rs.rsoutside[0].municipality_id == rs.rsoutside[e].municipality_id){

										fam_cum_o += Number(rs.rsoutside[e].family_cum);
										fam_now_o += Number(rs.rsoutside[e].family_now);
										per_cum_o += Number(rs.rsoutside[e].person_cum);
										per_now_o += Number(rs.rsoutside[e].person_now);

									}
								}

								$("#evac_stats_outside tbody").append(
									"<tr>"+
										"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; padding:2px; text-align: left'>         "+rs.rsoutside[r].municipality_name+"</th>"+
										"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'></th>"+
					  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(fam_cum_o))+"</th>"+
					  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(fam_now_o))+"</th>"+
					  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(per_cum_o))+"</th>"+
					  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(per_now_o))+"</th>"+
					  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'></th>"+
									"</tr>"
								)

								bname_origin = rs.rsoutside[r].brgy_origin;

								for(var b in rs.brgy){
									if((rs.brgy[b].id == rs.rsoutside[r].brgy_origin)){
										bname_origin = rs.brgy[b].brgy_name;
										break;
									}
								}

								$("#evac_stats_outside tbody").append(
									"<tr class='hoveredit' ondblclick='updateOutsideEvacuation("+rs.rsoutside[r].id+")'>"+
										"<th style='color: #000; border: 1px solid #000; padding:2px;'></th>"+
										"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px; text-align: left'>     "+rs.rsoutside[r].brgy_name+"</th>"+
					  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_cum))+"</th>"+
					  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_now))+"</th>"+
					  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_cum))+"</th>"+
					  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_now))+"</th>"+
					  					"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+isnull(bname_origin)+"</th>"+
									"</tr>"
								)

								fam_cum_o = 0;
								fam_now_o = 0;
								per_cum_o = 0;
								per_now_o = 0;

							}else{
								if(rs.rsoutside[r].municipality_id == rs.rsoutside[r-1].municipality_id){

									if(rs.rsoutside[r].brgy_host == rs.rsoutside[r-1].brgy_host){

										bname_origin = rs.rsoutside[r].brgy_origin;

										for(var b in rs.brgy){
											if((rs.brgy[b].id == rs.rsoutside[r].brgy_origin)){
												bname_origin = rs.brgy[b].brgy_name;
												break;
											}
										}

										$("#evac_stats_outside tbody").append(
											"<tr class='hoveredit' ondblclick='updateOutsideEvacuation("+rs.rsoutside[r].id+")'>"+
												"<th style='color: #000; border: 1px solid #000; padding:2px;'></th>"+
												"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     -do-</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_cum))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_now))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_cum))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_now))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+isnull(bname_origin)+"</th>"+
											"</tr>"
										)
									}else{

										bname_origin = rs.rsoutside[r].brgy_origin;

										for(var b in rs.brgy){
											if((rs.brgy[b].id == rs.rsoutside[r].brgy_origin)){
												bname_origin = rs.brgy[b].brgy_name;
												break;
											}
										}


										$("#evac_stats_outside tbody").append(
											"<tr class='hoveredit' ondblclick='updateOutsideEvacuation("+rs.rsoutside[r].id+")'>"+
												"<th style='color: #000; border: 1px solid #000; padding:2px;'></th>"+
												"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+rs.rsoutside[r].brgy_name+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_cum))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_now))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_cum))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_now))+"</th>"+
							  					"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+isnull(bname_origin)+"</th>"+
											"</tr>"
										)
									}
								}else{

									for(var e in rs.rsoutside){
										if(rs.rsoutside[r].municipality_id == rs.rsoutside[e].municipality_id){

											fam_cum_o += Number(rs.rsoutside[e].family_cum);
											fam_now_o += Number(rs.rsoutside[e].family_now);
											per_cum_o += Number(rs.rsoutside[e].person_cum);
											per_now_o += Number(rs.rsoutside[e].person_now);

										}
									}

									$("#evac_stats_outside tbody").append(
										"<tr>"+
											"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; padding:2px; text-align: left'>         "+rs.rsoutside[r].municipality_name+"</th>"+
											"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'></th>"+
						  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(fam_cum_o))+"</th>"+
						  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(fam_now_o))+"</th>"+
						  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(per_cum_o))+"</th>"+
						  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(per_now_o))+"</th>"+
						  					"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'></th>"+
										"</tr>"
									)

									bname_origin = rs.rsoutside[r].brgy_origin;

									for(var b in rs.brgy){
										if((rs.brgy[b].id == rs.rsoutside[r].brgy_origin)){
											bname_origin = rs.brgy[b].brgy_name;
											break;
										}
									}


									$("#evac_stats_outside tbody").append(
										"<tr class='hoveredit' ondblclick='updateOutsideEvacuation("+rs.rsoutside[r].id+")'>"+
											"<th style='color: #000; border: 1px solid #000; padding:2px;'></th>"+
											"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+rs.rsoutside[r].brgy_name+"</th>"+
						  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_cum))+"</th>"+
						  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_now))+"</th>"+
						  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_cum))+"</th>"+
						  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_now))+"</th>"+
						  					"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+isnull(bname_origin)+"</th>"+
										"</tr>"
									)

									if(rs.rsoutside[r].municipality_id == rs.rsoutside[r-1].municipality_id){
										if(rs.rsoutside[r].brgy_host == rs.rsoutside[r-1].brgy_host){

											bname_origin = rs.rsoutside[r].brgy_origin;

											for(var b in rs.brgy){
												if((rs.brgy[b].id == rs.rsoutside[r].brgy_origin)){
													bname_origin = rs.brgy[b].brgy_name;
													break;
												}
											}

											$("#evac_stats_outside tbody").append(
												"<tr class='hoveredit' ondblclick='updateOutsideEvacuation("+rs.rsoutside[r].id+")'>"+
													"<th style='color: #000; border: 1px solid #000; padding:2px;'></th>"+
													"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     -do-</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_cum))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_now))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_cum))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_now))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+isnull(bname_origin)+"</th>"+
												"</tr>"
											)
										}else{

											bname_origin = rs.rsoutside[r].brgy_origin;

											for(var b in rs.brgy){
												if((rs.brgy[b].id == rs.rsoutside[r].brgy_origin)){
													bname_origin = rs.brgy[b].brgy_name;
													break;
												}
											}

											$("#evac_stats_outside tbody").append(
												"<tr class='hoveredit' ondblclick='updateOutsideEvacuation("+rs.rsoutside[r].id+")'>"+
													"<th style='color: #000; border: 1px solid #000; padding:2px;'></th>"+
													"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+rs.rsoutside[r].brgy_name+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_cum))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].family_now))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_cum))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(rs.rsoutside[r].person_now))+"</th>"+
								  					"<th style='color: #000; border: 1px solid #000; text-align:left; padding:2px'>     "+isnull(bname_origin)+"</th>"+
												"</tr>"
											)
										}

										fam_cum_o = 0;
										fam_now_o = 0;
										per_cum_o = 0;
										per_now_o = 0;
									}

								}
							}
						}
					}

				}

				var brgy_num = 0;
				var fam_cum_o = 0;
				var fam_now_o = 0;
				var per_cum_o = 0;
				var per_now_o = 0;
				var brgy_num = 0;

				for(var g in rs.rsoutside){
					fam_cum_o += Number(rs.rsoutside[g].family_cum);
					fam_now_o += Number(rs.rsoutside[g].family_now);
					per_cum_o += Number(rs.rsoutside[g].person_cum);
					per_now_o += Number(rs.rsoutside[g].person_now);
					brgy_num += Number(rs.rsoutside[g].affbrgy);
				}

				$('#caraga_brgy_num_o').text(addComma(brgy_num));
				$('#caraga_fam_cum_o').text(addComma(fam_cum_o));
				$('#caraga_fam_now_o').text(addComma(fam_now_o));
				$('#caraga_per_cum_o').text(addComma(per_cum_o));
				$('#caraga_per_now_o').text(addComma(per_now_o));

		// ======== End Outside Evacuation Area ===============================================================================================================================

		// Start Sex and Age Data

		$("#tbl_sex_age tbody").empty();

		$("#tbl_sex_age_summary tbody").empty();

		for(var i in provinces){

			var infant_male_cum_p = 0;
			var infant_male_now_p = 0;
			var infant_female_cum_p = 0;
			var infant_female_now_p = 0;
			var toddlers_male_cum_p = 0;
			var toddlers_male_now_p = 0;
			var toddlers_female_cum_p = 0;
			var toddlers_female_now_p = 0;
			var preschoolers_male_cum_p = 0;
			var preschoolers_male_now_p = 0;
			var preschoolers_female_cum_p = 0;
			var preschoolers_female_now_p = 0;
			var schoolage_male_cum_p = 0;
			var schoolage_male_now_p = 0;
			var schoolage_female_cum_p = 0;
			var schoolage_female_now_p = 0;
			var teenage_male_cum_p = 0;
			var teenage_male_now_p = 0;
			var teenage_female_cum_p = 0;
			var teenage_female_now_p = 0;
			var adult_male_cum_p = 0;
			var adult_male_now_p = 0;
			var adult_female_cum_p = 0;
			var adult_female_now_p = 0;
			var senior_male_cum_p = 0;
			var senior_male_now_p = 0;
			var senior_female_cum_p = 0;
			var senior_female_now_p = 0;

			var tot_male_cum_p = 0;
			var tot_male_now_p = 0;
			var tot_female_cum_p = 0;
			var tot_female_now_p = 0;

			var pregnant_cum_p = 0;
			var pregnant_now_p = 0;
			var lactating_mother_cum_p = 0;
			var lactating_mother_now_p = 0;
			var unaccompanied_minor_male_cum_p = 0;
			var unaccompanied_minor_male_now_p = 0;
			var unaccompanied_minor_female_cum_p = 0;
			var unaccompanied_minor_female_now_p = 0;
			var pwd_male_cum_p = 0;
			var pwd_male_now_p = 0;
			var pwd_female_cum_p = 0;
			var pwd_female_now_p = 0;
			var solo_parent_male_cum_p = 0;
			var solo_parent_male_now_p = 0;
			var solo_parent_female_cum_p = 0;
			var solo_parent_female_now_p = 0;
			var ip_male_cum_p = 0;
			var ip_male_now_p = 0;
			var ip_female_cum_p = 0;
			var ip_female_now_p = 0;

			for(var e in rs.rs_sex_age){

				if(rs.rs_sex_age[e].province_id == provinces[i].id){

					infant_male_cum_p 			+= Number(rs.rs_sex_age[e].infant_male_cum);
					infant_male_now_p 			+= Number(rs.rs_sex_age[e].infant_male_now);
					infant_female_cum_p 		+= Number(rs.rs_sex_age[e].infant_female_cum);
					infant_female_now_p 		+= Number(rs.rs_sex_age[e].infant_female_now);

					toddlers_male_cum_p 		+= Number(rs.rs_sex_age[e].toddlers_male_cum);
					toddlers_male_now_p 		+= Number(rs.rs_sex_age[e].toddlers_male_now);
					toddlers_female_cum_p 		+= Number(rs.rs_sex_age[e].toddlers_female_cum);
					toddlers_female_now_p 		+= Number(rs.rs_sex_age[e].toddlers_female_now);

					preschoolers_male_cum_p 	+= Number(rs.rs_sex_age[e].preschoolers_male_cum);
					preschoolers_male_now_p 	+= Number(rs.rs_sex_age[e].preschoolers_male_now);
					preschoolers_female_cum_p 	+= Number(rs.rs_sex_age[e].preschoolers_female_cum);
					preschoolers_female_now_p 	+= Number(rs.rs_sex_age[e].preschoolers_female_now);

					schoolage_male_cum_p 		+= Number(rs.rs_sex_age[e].schoolage_male_cum);
					schoolage_male_now_p 		+= Number(rs.rs_sex_age[e].schoolage_male_now);
					schoolage_female_cum_p 		+= Number(rs.rs_sex_age[e].schoolage_female_cum);
					schoolage_female_now_p 		+= Number(rs.rs_sex_age[e].schoolage_female_now);

					teenage_male_cum_p 			+= Number(rs.rs_sex_age[e].teenage_male_cum);
					teenage_male_now_p 			+= Number(rs.rs_sex_age[e].teenage_male_now);
					teenage_female_cum_p 		+= Number(rs.rs_sex_age[e].teenage_female_cum);
					teenage_female_now_p 		+= Number(rs.rs_sex_age[e].teenage_female_now);

					adult_male_cum_p 			+= Number(rs.rs_sex_age[e].adult_male_cum);
					adult_male_now_p 			+= Number(rs.rs_sex_age[e].adult_male_now);
					adult_female_cum_p 			+= Number(rs.rs_sex_age[e].adult_female_cum);
					adult_female_now_p 			+= Number(rs.rs_sex_age[e].adult_female_now);

					senior_male_cum_p 			+= Number(rs.rs_sex_age[e].senior_male_cum);
					senior_male_now_p 			+= Number(rs.rs_sex_age[e].senior_male_now);
					senior_female_cum_p 		+= Number(rs.rs_sex_age[e].senior_female_cum);
					senior_female_now_p 		+= Number(rs.rs_sex_age[e].senior_female_now);

					pregnant_cum_p 				+= Number(rs.rs_sex_age[e].pregnant_cum);
					pregnant_now_p 				+= Number(rs.rs_sex_age[e].pregnant_now);
					lactating_mother_cum_p 				+= Number(rs.rs_sex_age[e].lactating_mother_cum);
					lactating_mother_now_p 				+= Number(rs.rs_sex_age[e].lactating_mother_now);
					unaccompanied_minor_male_cum_p 		+= Number(rs.rs_sex_age[e].unaccompanied_minor_male_cum);
					unaccompanied_minor_male_now_p 		+= Number(rs.rs_sex_age[e].unaccompanied_minor_male_now);
					unaccompanied_minor_female_cum_p 	+= Number(rs.rs_sex_age[e].unaccompanied_minor_female_cum);
					unaccompanied_minor_female_now_p 	+= Number(rs.rs_sex_age[e].unaccompanied_minor_female_now);
					pwd_male_cum_p 						+= Number(rs.rs_sex_age[e].pwd_male_cum);
					pwd_male_now_p 						+= Number(rs.rs_sex_age[e].pwd_male_now);
					pwd_female_cum_p 					+= Number(rs.rs_sex_age[e].pwd_female_cum);
					pwd_female_now_p 					+= Number(rs.rs_sex_age[e].pwd_female_now);
					solo_parent_male_cum_p 				+= Number(rs.rs_sex_age[e].solo_parent_male_cum);
					solo_parent_male_now_p 				+= Number(rs.rs_sex_age[e].solo_parent_male_now);
					solo_parent_female_cum_p 			+= Number(rs.rs_sex_age[e].solo_parent_female_cum);
					solo_parent_female_now_p 			+= Number(rs.rs_sex_age[e].solo_parent_female_now);
					ip_male_cum_p 						+= Number(rs.rs_sex_age[e].ip_male_cum);
					ip_male_now_p 						+= Number(rs.rs_sex_age[e].ip_male_now);
					ip_female_cum_p						+= Number(rs.rs_sex_age[e].ip_female_cum);
					ip_female_now_p						+= Number(rs.rs_sex_age[e].ip_female_now);

					

				}
			}

			tot_male_cum_p += (infant_male_cum_p + toddlers_male_cum_p + preschoolers_male_cum_p + schoolage_male_cum_p + teenage_male_cum_p + adult_male_cum_p + senior_male_cum_p);

			tot_male_now_p += (infant_male_now_p + toddlers_male_now_p + preschoolers_male_now_p + schoolage_male_now_p + teenage_male_now_p + adult_male_now_p + senior_male_now_p);

			tot_female_cum_p += (infant_female_cum_p + toddlers_female_cum_p + preschoolers_female_cum_p + schoolage_female_cum_p + teenage_female_cum_p + adult_female_cum_p + senior_female_cum_p);

			tot_female_now_p += (infant_female_now_p + toddlers_female_now_p + preschoolers_female_now_p + schoolage_female_now_p + teenage_female_now_p + adult_female_now_p + senior_female_now_p);

			if(Number(tot_male_cum_p) > 0 || Number(tot_female_cum_p) > 0){

				$("#tbl_sex_age tbody").append(
					"<tr>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; padding:2px; text-align: left'>"+provinces[i].name+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_female_now_p))+"</th>"+

						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_female_now_p))+"</th>"+

						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pregnant_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pregnant_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(lactating_mother_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(lactating_mother_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_female_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_male_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_male_now_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_female_cum_p))+"</th>"+
						"<th style='background-color: #A6A6A6; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_female_now_p))+"</th>"+
					"</tr>"
				)
			}

			if(Number(infant_male_now_p) > 0 || Number(infant_female_now_p) > 0 || Number(toddlers_male_now_p) > 0 || Number(toddlers_female_now_p) > 0 || Number(preschoolers_male_now_p) > 0 || Number(preschoolers_female_now_p) > 0 || Number(schoolage_male_now_p) > 0 || Number(schoolage_female_now_p) > 0 || Number(teenage_male_now_p) > 0 || Number(teenage_female_now_p) > 0 || Number(adult_male_now_p) > 0 || Number(adult_female_now_p) > 0 || Number(senior_male_now_p) > 0 || Number(senior_female_now_p) > 0 || Number(tot_male_now_p) > 0 || Number(tot_female_now_p) > 0 || Number(pregnant_now_p) > 0 || Number(lactating_mother_now_p) > 0 || Number(unaccompanied_minor_male_now_p) > 0 || Number(unaccompanied_minor_female_now_p) > 0 || Number(pwd_male_now_p) > 0 || Number(pwd_female_now_p) > 0 || Number(solo_parent_male_now_p) > 0 || Number(solo_parent_female_now_p) > 0 || Number(ip_male_now_p) > 0 || Number(ip_female_now_p)){
				$("#tbl_sex_age_summary tbody").append(
					"<tr>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; padding:2px; text-align: left'>"+provinces[i].name+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_female_now_p))+"</th>"+

						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_female_now_p))+"</th>"+

						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pregnant_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(lactating_mother_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_female_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_male_now_p))+"</th>"+
						"<th style='background-color: #B6DDE8; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_female_now_p))+"</th>"+
					"</tr>"
				)
			}

			for(var r in rs.rs_sex_age){

				var infant_male_cum_m = 0;
				var infant_male_now_m = 0;
				var infant_female_cum_m = 0;
				var infant_female_now_m = 0;
				var toddlers_male_cum_m = 0;
				var toddlers_male_now_m = 0;
				var toddlers_female_cum_m = 0;
				var toddlers_female_now_m = 0;
				var preschoolers_male_cum_m = 0;
				var preschoolers_male_now_m = 0;
				var preschoolers_female_cum_m = 0;
				var preschoolers_female_now_m = 0;
				var schoolage_male_cum_m = 0;
				var schoolage_male_now_m = 0;
				var schoolage_female_cum_m = 0;
				var schoolage_female_now_m = 0;
				var teenage_male_cum_m = 0;
				var teenage_male_now_m = 0;
				var teenage_female_cum_m = 0;
				var teenage_female_now_m = 0;
				var adult_male_cum_m = 0;
				var adult_male_now_m = 0;
				var adult_female_cum_m = 0;
				var adult_female_now_m = 0;
				var senior_male_cum_m = 0;
				var senior_male_now_m = 0;
				var senior_female_cum_m = 0;
				var senior_female_now_m = 0;

				var tot_male_cum_m = 0;
				var tot_male_now_m = 0;
				var tot_female_cum_m = 0;
				var tot_female_now_m = 0;

				var pregnant_cum_m = 0;
				var pregnant_now_m = 0;
				var lactating_mother_cum_m = 0;
				var lactating_mother_now_m = 0;
				var unaccompanied_minor_male_cum_m = 0;
				var unaccompanied_minor_male_now_m = 0;
				var unaccompanied_minor_female_cum_m = 0;
				var unaccompanied_minor_female_now_m = 0;
				var pwd_male_cum_m = 0;
				var pwd_male_now_m = 0;
				var pwd_female_cum_m = 0;
				var pwd_female_now_m = 0;
				var solo_parent_male_cum_m = 0;
				var solo_parent_male_now_m = 0;
				var solo_parent_female_cum_m = 0;
				var solo_parent_female_now_m = 0;
				var ip_male_cum_m = 0;
				var ip_male_now_m = 0;
				var ip_female_cum_m = 0;
				var ip_female_now_m = 0;

				if(provinces[i].id == rs.rs_sex_age[r].province_id){

					for(var e in rs.rs_sex_age){

						if(rs.rs_sex_age[r].municipality_id == rs.rs_sex_age[e].municipality_id){

							infant_male_cum_m 			+= Number(rs.rs_sex_age[e].infant_male_cum);
							infant_male_now_m 			+= Number(rs.rs_sex_age[e].infant_male_now);
							infant_female_cum_m 		+= Number(rs.rs_sex_age[e].infant_female_cum);
							infant_female_now_m 		+= Number(rs.rs_sex_age[e].infant_female_now);
							toddlers_male_cum_m 		+= Number(rs.rs_sex_age[e].toddlers_male_cum);
							toddlers_male_now_m 		+= Number(rs.rs_sex_age[e].toddlers_male_now);
							toddlers_female_cum_m 		+= Number(rs.rs_sex_age[e].toddlers_female_cum);
							toddlers_female_now_m 		+= Number(rs.rs_sex_age[e].toddlers_female_now);
							preschoolers_male_cum_m 	+= Number(rs.rs_sex_age[e].preschoolers_male_cum);
							preschoolers_male_now_m 	+= Number(rs.rs_sex_age[e].preschoolers_male_now);
							preschoolers_female_cum_m 	+= Number(rs.rs_sex_age[e].preschoolers_female_cum);
							preschoolers_female_now_m 	+= Number(rs.rs_sex_age[e].preschoolers_female_now);
							schoolage_male_cum_m 		+= Number(rs.rs_sex_age[e].schoolage_male_cum);
							schoolage_male_now_m 		+= Number(rs.rs_sex_age[e].schoolage_male_now);
							schoolage_female_cum_m 		+= Number(rs.rs_sex_age[e].schoolage_female_cum);
							schoolage_female_now_m 		+= Number(rs.rs_sex_age[e].schoolage_female_now);
							teenage_male_cum_m 			+= Number(rs.rs_sex_age[e].teenage_male_cum);
							teenage_male_now_m 			+= Number(rs.rs_sex_age[e].teenage_male_now);
							teenage_female_cum_m 		+= Number(rs.rs_sex_age[e].teenage_female_cum);
							teenage_female_now_m 		+= Number(rs.rs_sex_age[e].teenage_female_now);
							adult_male_cum_m 			+= Number(rs.rs_sex_age[e].adult_male_cum);
							adult_male_now_m 			+= Number(rs.rs_sex_age[e].adult_male_now);
							adult_female_cum_m 			+= Number(rs.rs_sex_age[e].adult_female_cum);
							adult_female_now_m 			+= Number(rs.rs_sex_age[e].adult_female_now);
							senior_male_cum_m 			+= Number(rs.rs_sex_age[e].senior_male_cum);
							senior_male_now_m 			+= Number(rs.rs_sex_age[e].senior_male_now);
							senior_female_cum_m 		+= Number(rs.rs_sex_age[e].senior_female_cum);
							senior_female_now_m 		+= Number(rs.rs_sex_age[e].senior_female_now);

							pregnant_cum_m 				+= Number(rs.rs_sex_age[e].pregnant_cum);
							pregnant_now_m 				+= Number(rs.rs_sex_age[e].pregnant_now);
							lactating_mother_cum_m 				+= Number(rs.rs_sex_age[e].lactating_mother_cum);
							lactating_mother_now_m 				+= Number(rs.rs_sex_age[e].lactating_mother_now);
							unaccompanied_minor_male_cum_m 		+= Number(rs.rs_sex_age[e].unaccompanied_minor_male_cum);
							unaccompanied_minor_male_now_m 		+= Number(rs.rs_sex_age[e].unaccompanied_minor_male_now);
							unaccompanied_minor_female_cum_m 	+= Number(rs.rs_sex_age[e].unaccompanied_minor_female_cum);
							unaccompanied_minor_female_now_m 	+= Number(rs.rs_sex_age[e].unaccompanied_minor_female_now);
							pwd_male_cum_m 						+= Number(rs.rs_sex_age[e].pwd_male_cum);
							pwd_male_now_m 						+= Number(rs.rs_sex_age[e].pwd_male_now);
							pwd_female_cum_m 					+= Number(rs.rs_sex_age[e].pwd_female_cum);
							pwd_female_now_m 					+= Number(rs.rs_sex_age[e].pwd_female_now);
							solo_parent_male_cum_m 				+= Number(rs.rs_sex_age[e].solo_parent_male_cum);
							solo_parent_male_now_m 				+= Number(rs.rs_sex_age[e].solo_parent_male_now);
							solo_parent_female_cum_m 			+= Number(rs.rs_sex_age[e].solo_parent_female_cum);
							solo_parent_female_now_m 			+= Number(rs.rs_sex_age[e].solo_parent_female_now);
							ip_male_cum_m 						+= Number(rs.rs_sex_age[e].ip_male_cum);
							ip_male_now_m 						+= Number(rs.rs_sex_age[e].ip_male_now);
							ip_female_cum_m						+= Number(rs.rs_sex_age[e].ip_female_cum);
							ip_female_now_m						+= Number(rs.rs_sex_age[e].ip_female_now);

							tot_male_cum_m += (infant_male_cum_m + toddlers_male_cum_m + preschoolers_male_cum_m + schoolage_male_cum_m + teenage_male_cum_m + adult_male_cum_m + senior_male_cum_m);

							tot_male_now_m += (infant_male_now_m + toddlers_male_now_m + preschoolers_male_now_m + schoolage_male_now_m + teenage_male_now_m + adult_male_now_m + senior_male_now_m);

							tot_female_cum_m += (infant_female_cum_m + toddlers_female_cum_m + preschoolers_female_cum_m + schoolage_female_cum_m + teenage_female_cum_m + adult_female_cum_m + senior_female_cum_m);

							tot_female_now_m += (infant_female_now_m + toddlers_female_now_m + preschoolers_female_now_m + schoolage_female_now_m + teenage_female_now_m + adult_female_now_m + senior_female_now_m);

						}
					}

					$("#tbl_sex_age tbody").append(
						"<tr class='hoveredit' ondblclick='updateSexAgeData("+rs.rs_sex_age[r].id+")' style='cursor: pointer' title='Double click to edit/update'>"+
							"<th style='color: #000; border: 1px solid #000; padding:2px; text-align: left'>    "+rs.rs_sex_age[r].municipality_name+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_female_now_m))+"</th>"+

							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_female_now_m))+"</th>"+

							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pregnant_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pregnant_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(lactating_mother_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(lactating_mother_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_female_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_male_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_male_now_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_female_cum_m))+"</th>"+
							"<th style='color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_female_now_m))+"</th>"+
						"</tr>"
					)

					if(Number(infant_male_now_m) > 0 || Number(infant_female_now_m) > 0 || 
						Number(toddlers_male_now_m) > 0 || Number(toddlers_female_now_m) > 0 || 
						Number(preschoolers_male_now_m) > 0 || Number(preschoolers_female_now_m) > 0 || 
						Number(schoolage_male_now_m) > 0 || Number(schoolage_female_now_m) > 0 || Number(teenage_male_now_m) > 0 || 
						Number(teenage_female_now_m) > 0 || Number(adult_male_now_m) > 0 || Number(adult_female_now_m) > 0 || 
						Number(senior_male_now_m) > 0 || Number(senior_female_now_m) > 0 || Number(tot_male_now_m) > 0 || 
						Number(tot_female_now_m) > 0 || Number(pregnant_now_m) > 0 || Number(lactating_mother_now_m) > 0 || 
						Number(unaccompanied_minor_male_now_m) > 0 || Number(unaccompanied_minor_female_now_m) > 0 || 
						Number(pwd_male_now_m) > 0 || Number(pwd_female_now_m) > 0 || Number(solo_parent_male_now_m) > 0 || 
						Number(solo_parent_female_now_m) > 0 || Number(ip_male_now_m) > 0 || Number(ip_female_now_m)){

						$("#tbl_sex_age_summary tbody").append(
							"<tr>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; padding:2px; text-align: left'>    "+rs.rs_sex_age[r].municipality_name.toUpperCase()+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(infant_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(toddlers_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(preschoolers_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(schoolage_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(teenage_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(adult_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(senior_female_now_m))+"</td>"+

								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(tot_female_now_m))+"</td>"+

								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pregnant_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(lactating_mother_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(unaccompanied_minor_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(pwd_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(solo_parent_female_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_male_now_m))+"</td>"+
								"<td style='background-color: #FFFFFF; color: #000; border: 1px solid #000; text-align:center; padding:2px'>"+addComma(isnull(ip_female_now_m))+"</td>"+
							"</tr>"
						)
					}
				}
			}

		}

		var infant_male_cum_c = 0;
		var infant_male_now_c = 0;
		var infant_female_cum_c = 0;
		var infant_female_now_c = 0;
		var toddlers_male_cum_c = 0;
		var toddlers_male_now_c = 0;
		var toddlers_female_cum_c = 0;
		var toddlers_female_now_c = 0;
		var preschoolers_male_cum_c = 0;
		var preschoolers_male_now_c = 0;
		var preschoolers_female_cum_c = 0;
		var preschoolers_female_now_c = 0;
		var schoolage_male_cum_c = 0;
		var schoolage_male_now_c = 0;
		var schoolage_female_cum_c = 0;
		var schoolage_female_now_c = 0;
		var teenage_male_cum_c = 0;
		var teenage_male_now_c = 0;
		var teenage_female_cum_c = 0;
		var teenage_female_now_c = 0;
		var adult_male_cum_c = 0;
		var adult_male_now_c = 0;
		var adult_female_cum_c = 0;
		var adult_female_now_c = 0;
		var senior_male_cum_c = 0;
		var senior_male_now_c = 0;
		var senior_female_cum_c = 0;
		var senior_female_now_c = 0;

		var tot_male_cum_c = 0;
		var tot_male_now_c = 0;
		var tot_female_cum_c = 0;
		var tot_female_now_c = 0;

		var pregnant_cum_c = 0;
		var pregnant_now_c = 0;
		var lactating_mother_cum_c = 0;
		var lactating_mother_now_c = 0;
		var unaccompanied_minor_male_cum_c = 0;
		var unaccompanied_minor_male_now_c = 0;
		var unaccompanied_minor_female_cum_c = 0;
		var unaccompanied_minor_female_now_c = 0;
		var pwd_male_cum_c = 0;
		var pwd_male_now_c = 0;
		var pwd_female_cum_c = 0;
		var pwd_female_now_c = 0;
		var solo_parent_male_cum_c = 0;
		var solo_parent_male_now_c = 0;
		var solo_parent_female_cum_c = 0;
		var solo_parent_female_now_c = 0;
		var ip_male_cum_c = 0;
		var ip_male_now_c = 0;
		var ip_female_cum_c = 0;
		var ip_female_now_c = 0;

		for(var r in rs.rs_sex_age){

			infant_male_cum_c 			+= Number(rs.rs_sex_age[r].infant_male_cum);
			infant_male_now_c 			+= Number(rs.rs_sex_age[r].infant_male_now);
			infant_female_cum_c 		+= Number(rs.rs_sex_age[r].infant_female_cum);
			infant_female_now_c 		+= Number(rs.rs_sex_age[r].infant_female_now);
			toddlers_male_cum_c 		+= Number(rs.rs_sex_age[r].toddlers_male_cum);
			toddlers_male_now_c 		+= Number(rs.rs_sex_age[r].toddlers_male_now);
			toddlers_female_cum_c 		+= Number(rs.rs_sex_age[r].toddlers_female_cum);
			toddlers_female_now_c 		+= Number(rs.rs_sex_age[r].toddlers_female_now);
			preschoolers_male_cum_c 	+= Number(rs.rs_sex_age[r].preschoolers_male_cum);
			preschoolers_male_now_c 	+= Number(rs.rs_sex_age[r].preschoolers_male_now);
			preschoolers_female_cum_c 	+= Number(rs.rs_sex_age[r].preschoolers_female_cum);
			preschoolers_female_now_c 	+= Number(rs.rs_sex_age[r].preschoolers_female_now);
			schoolage_male_cum_c 		+= Number(rs.rs_sex_age[r].schoolage_male_cum);
			schoolage_male_now_c 		+= Number(rs.rs_sex_age[r].schoolage_male_now);
			schoolage_female_cum_c 		+= Number(rs.rs_sex_age[r].schoolage_female_cum);
			schoolage_female_now_c 		+= Number(rs.rs_sex_age[r].schoolage_female_now);
			teenage_male_cum_c 			+= Number(rs.rs_sex_age[r].teenage_male_cum);
			teenage_male_now_c 			+= Number(rs.rs_sex_age[r].teenage_male_now);
			teenage_female_cum_c 		+= Number(rs.rs_sex_age[r].teenage_female_cum);
			teenage_female_now_c 		+= Number(rs.rs_sex_age[r].teenage_female_now);
			adult_male_cum_c 			+= Number(rs.rs_sex_age[r].adult_male_cum);
			adult_male_now_c 			+= Number(rs.rs_sex_age[r].adult_male_now);
			adult_female_cum_c 			+= Number(rs.rs_sex_age[r].adult_female_cum);
			adult_female_now_c 			+= Number(rs.rs_sex_age[r].adult_female_now);
			senior_male_cum_c 			+= Number(rs.rs_sex_age[r].senior_male_cum);
			senior_male_now_c 			+= Number(rs.rs_sex_age[r].senior_male_now);
			senior_female_cum_c 		+= Number(rs.rs_sex_age[r].senior_female_cum);
			senior_female_now_c 		+= Number(rs.rs_sex_age[r].senior_female_now);

			pregnant_cum_c 				+= Number(rs.rs_sex_age[r].pregnant_cum);
			pregnant_now_c 				+= Number(rs.rs_sex_age[r].pregnant_now);
			lactating_mother_cum_c 				+= Number(rs.rs_sex_age[r].lactating_mother_cum);
			lactating_mother_now_c 				+= Number(rs.rs_sex_age[r].lactating_mother_now);
			unaccompanied_minor_male_cum_c 		+= Number(rs.rs_sex_age[r].unaccompanied_minor_male_cum);
			unaccompanied_minor_male_now_c 		+= Number(rs.rs_sex_age[r].unaccompanied_minor_male_now);
			unaccompanied_minor_female_cum_c 	+= Number(rs.rs_sex_age[r].unaccompanied_minor_female_cum);
			unaccompanied_minor_female_now_c 	+= Number(rs.rs_sex_age[r].unaccompanied_minor_female_now);
			pwd_male_cum_c 						+= Number(rs.rs_sex_age[r].pwd_male_cum);
			pwd_male_now_c 						+= Number(rs.rs_sex_age[r].pwd_male_now);
			pwd_female_cum_c 					+= Number(rs.rs_sex_age[r].pwd_female_cum);
			pwd_female_now_c 					+= Number(rs.rs_sex_age[r].pwd_female_now);
			solo_parent_male_cum_c 				+= Number(rs.rs_sex_age[r].solo_parent_male_cum);
			solo_parent_male_now_c 				+= Number(rs.rs_sex_age[r].solo_parent_male_now);
			solo_parent_female_cum_c 			+= Number(rs.rs_sex_age[r].solo_parent_female_cum);
			solo_parent_female_now_c 			+= Number(rs.rs_sex_age[r].solo_parent_female_now);
			ip_male_cum_c 						+= Number(rs.rs_sex_age[r].ip_male_cum);
			ip_male_now_c 						+= Number(rs.rs_sex_age[r].ip_male_now);
			ip_female_cum_c						+= Number(rs.rs_sex_age[r].ip_female_cum);
			ip_female_now_c						+= Number(rs.rs_sex_age[r].ip_female_now);

		}

		tot_male_cum_c += (infant_male_cum_c + toddlers_male_cum_c + preschoolers_male_cum_c + schoolage_male_cum_c + teenage_male_cum_c + adult_male_cum_c + senior_male_cum_c);

		tot_male_now_c += (infant_male_now_c + toddlers_male_now_c + preschoolers_male_now_c + schoolage_male_now_c + teenage_male_now_c + adult_male_now_c + senior_male_now_c);

		tot_female_cum_c += (infant_female_cum_c + toddlers_female_cum_c + preschoolers_female_cum_c + schoolage_female_cum_c + teenage_female_cum_c + adult_female_cum_c + senior_female_cum_c);

		tot_female_now_c += (infant_female_now_c + toddlers_female_now_c + preschoolers_female_now_c + schoolage_female_now_c + teenage_female_now_c + adult_female_now_c + senior_female_now_c);

		$('#infant_male_cum_c').text(infant_male_cum_c);
		$('#infant_male_now_c').text(infant_male_now_c);
		$('#infant_female_cum_c').text(infant_female_cum_c);
		$('#infant_female_now_c').text(infant_female_now_c);
		$('#toddlers_male_cum_c').text(toddlers_male_cum_c);
		$('#toddlers_male_now_c').text(toddlers_male_now_c);
		$('#toddlers_female_cum_c').text(toddlers_female_cum_c);
		$('#toddlers_female_now_c').text(toddlers_female_now_c);
		$('#preschoolers_male_cum_c').text(preschoolers_male_cum_c);
		$('#preschoolers_male_now_c').text(preschoolers_male_now_c);
		$('#preschoolers_female_cum_c').text(preschoolers_female_cum_c);
		$('#preschoolers_female_now_c').text(preschoolers_female_now_c);
		$('#schoolage_male_cum_c').text(schoolage_male_cum_c);
		$('#schoolage_male_now_c').text(schoolage_male_now_c);
		$('#schoolage_female_cum_c').text(schoolage_female_cum_c);
		$('#schoolage_female_now_c').text(schoolage_female_now_c);
		$('#teenage_male_cum_c').text(teenage_male_cum_c);
		$('#teenage_male_now_c').text(teenage_male_now_c);
		$('#teenage_female_cum_c').text(teenage_female_cum_c);
		$('#teenage_female_now_c').text(teenage_female_now_c);
		$('#adult_male_cum_c').text(adult_male_cum_c);
		$('#adult_male_now_c').text(adult_male_now_c);
		$('#adult_female_cum_c').text(adult_female_cum_c);
		$('#adult_female_now_c').text(adult_female_now_c);
		$('#senior_male_cum_c').text(senior_male_cum_c);
		$('#senior_male_now_c').text(senior_male_now_c);
		$('#senior_female_cum_c').text(senior_female_cum_c);
		$('#senior_female_now_c').text(senior_female_now_c);

		$('#tot_male_cum_c').text(tot_male_cum_c);
		$('#tot_male_now_c').text(tot_male_now_c);
		$('#tot_female_cum_c').text(tot_female_cum_c);
		$('#tot_female_now_c').text(tot_female_now_c);

		$('#pregnant_cum_c').text(pregnant_cum_c);
		$('#pregnant_now_c').text(pregnant_now_c);
		$('#lactating_mother_cum_c').text(lactating_mother_cum_c);
		$('#lactating_mother_now_c').text(lactating_mother_now_c);
		$('#unaccompanied_minor_male_cum_c').text(unaccompanied_minor_male_cum_c);
		$('#unaccompanied_minor_male_now_c').text(unaccompanied_minor_male_now_c);
		$('#unaccompanied_minor_female_cum_c').text(unaccompanied_minor_female_cum_c);
		$('#unaccompanied_minor_female_now_c').text(unaccompanied_minor_female_now_c);
		$('#pwd_male_cum_c').text(pwd_male_cum_c);
		$('#pwd_male_now_c').text(pwd_male_now_c);
		$('#pwd_female_cum_c').text(pwd_female_cum_c);
		$('#pwd_female_now_c').text(pwd_female_now_c);
		$('#solo_parent_male_cum_c').text(solo_parent_male_cum_c);
		$('#solo_parent_male_now_c').text(solo_parent_male_now_c);
		$('#solo_parent_female_cum_c').text(solo_parent_female_cum_c);
		$('#solo_parent_female_now_c').text(solo_parent_female_now_c);
		$('#ip_male_cum_c').text(ip_male_cum_c);
		$('#ip_male_now_c').text(ip_male_now_c);
		$('#ip_female_cum_c').text(ip_female_cum_c);
		$('#ip_female_now_c').text(ip_female_now_c);



		$('#infant_male_now_c_summary').text(addComma(isnull(infant_male_now_c)));
		$('#infant_female_now_c_summary').text(addComma(isnull(infant_female_now_c)));
		$('#toddlers_male_now_c_summary').text(addComma(isnull(toddlers_male_now_c)));
		$('#toddlers_female_now_c_summary').text(addComma(isnull(toddlers_female_now_c)));
		$('#preschoolers_male_now_c_summary').text(addComma(isnull(preschoolers_male_now_c)));
		$('#preschoolers_female_now_c_summary').text(addComma(isnull(preschoolers_female_now_c)));
		$('#schoolage_male_now_c_summary').text(addComma(isnull(schoolage_male_now_c)));
		$('#schoolage_female_now_c_summary').text(addComma(isnull(schoolage_female_now_c)));
		$('#teenage_male_now_c_summary').text(addComma(isnull(teenage_male_now_c)));
		$('#teenage_female_now_c_summary').text(addComma(isnull(teenage_female_now_c)));
		$('#adult_male_now_c_summary').text(addComma(isnull(adult_male_now_c)));
		$('#adult_female_now_c_summary').text(addComma(isnull(adult_female_now_c)));
		$('#senior_male_now_c_summary').text(addComma(isnull(senior_male_now_c)));
		$('#senior_female_now_c_summary').text(addComma(isnull(senior_female_now_c)));

		$('#tot_male_now_c_summary').text(addComma(isnull(tot_male_now_c)));
		$('#tot_female_now_c_summary').text(addComma(isnull(tot_female_now_c)));

		$('#pregnant_now_c_summary').text(addComma(isnull(pregnant_now_c)));
		$('#lactating_mother_now_c_summary').text(addComma(isnull(lactating_mother_now_c)));
		$('#unaccompanied_minor_male_now_c_summary').text(addComma(isnull(unaccompanied_minor_male_now_c)));
		$('#unaccompanied_minor_female_now_c_summary').text(addComma(isnull(unaccompanied_minor_female_now_c)));
		$('#pwd_male_now_c_summary').text(addComma(isnull(pwd_male_now_c)));
		$('#pwd_female_now_c_summary').text(addComma(isnull(pwd_female_now_c)));
		$('#solo_parent_male_now_c_summary').text(addComma(isnull(solo_parent_male_now_c)));
		$('#solo_parent_female_now_c_summary').text(addComma(isnull(solo_parent_female_now_c)));
		$('#ip_male_now_c_summary').text(addComma(isnull(ip_male_now_c)));
		$('#ip_female_now_c_summary').text(addComma(isnull(ip_female_now_c)));

		//================================= End Sex and Age Disaggregated Data ========================================================================

		// ======== Casualties ================================================================================================================================================
				$('#tbl_casualties tbody').empty();
				for(var w in rs.query_casualties){
					var itemno = Number(w) + 1;
					$('#tbl_casualties tbody').append(
						"<tr style='border: 1px solid #000; cursor:pointer; color: #000' ondblclick='getCasualty("+rs.query_casualties[w].id+")' class='hoveredit'>"+
							"<td style='border: 1px solid #000; text-align:center'>"+itemno+"</td>"+
							"<td style='border: 1px solid #000; text-align:left'>"+rs.query_casualties[w].lastname+"</td>"+
							"<td style='border: 1px solid #000; text-align:left'>"+rs.query_casualties[w].firstname+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+isnull(rs.query_casualties[w].middle_i)+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+isnull(rs.query_casualties[w].age)+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+rs.query_casualties[w].gender+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+rs.query_casualties[w].province_name+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+rs.query_casualties[w].municipality_name+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+rs.query_casualties[w].brgyname+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+isnulld(rs.query_casualties[w].isdead)+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+isnulld(rs.query_casualties[w].ismissing)+"</td>"+
							"<td style='border: 1px solid #000; text-align:center'>"+isnulld(rs.query_casualties[w].isinjured)+"</td>"+
							"<td style='border: 1px solid #000; text-align:left'>"+rs.query_casualties[w].remarks+"</td>"+
						"</tr>"
					)

				}

		// ======== End Casualties ============================================================================================================================================

		// Master Query =======================================================================================================================================================

				for(var y in provinces){

					if(y == 0){ // Agusan del Norte
						var family_a_t 		= 0;
						var person_a_t 		= 0;
						var family_cum_i 	= 0;
						var family_now_i 	= 0;
						var person_cum_i 	= 0;
						var person_now_i 	= 0;
						var family_cum_o 	= 0;
						var family_now_o 	= 0;
						var person_cum_o 	= 0;
						var person_now_o 	= 0;
						var family_cum_s_t 	= 0;
						var family_now_s_t 	= 0;
						var person_cum_s_t 	= 0;
						var person_now_s_t 	= 0;
						var bnum 			= 0;
						var ec_cum 			= 0;
						var ec_now 			= 0;
						var ec_cum_t 		= 0;
						var ec_now_t 		= 0;

						for(var k in rs.masterquery){
							if(rs.masterquery[k].provinceid == 1){
								family_a_t += Number(rs.masterquery[k].family_a_t);
								person_a_t += Number(rs.masterquery[k].person_a_t);
								family_cum_i += Number(rs.masterquery[k].family_cum_i);
								family_now_i += Number(rs.masterquery[k].family_now_i);
								person_cum_i += Number(rs.masterquery[k].person_cum_i);
								person_now_i += Number(rs.masterquery[k].person_now_i);
								family_cum_o += Number(rs.masterquery[k].family_cum_o);
								family_now_o += Number(rs.masterquery[k].family_now_o);
								person_cum_o += Number(rs.masterquery[k].person_cum_o);
								person_now_o += Number(rs.masterquery[k].person_now_o);
								family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
								family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
								person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
								person_now_s_t += Number(rs.masterquery[k].person_now_s_t);
							}
						}
						for(var f in rs.masterquery2){
							if(rs.masterquery2[f].provinceid == 1){
								bnum += Number(rs.masterquery2[f].brgynum);
							}
						}
						for(var w in rs.masterquery3){
							if(rs.masterquery3[w].provinceid == 1){
								ec_cum_t += Number(rs.masterquery3[w].ec_cum);
								ec_now_t += Number(rs.masterquery3[w].ec_now);
							}
						}
						$("#tbl_masterquery tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#BFBFBF; color: #000;'>      <b>"+provinces[y].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_s_t))+"</td>"+
							"</tr>"
						)
							for(var m in rs.city){
								if(rs.city[m].provinceid == 1){
									for(var h in rs.masterquery){
										for(var f in rs.masterquery2){
											if(rs.masterquery2[f].municipality_id == rs.city[m].id){
												var brgynum = Number(rs.masterquery2[f].brgynum);
												break;
											}
										}
										if(rs.masterquery[h].municipality_id == rs.city[m].id){
											for(var w in rs.masterquery3){
												if(rs.masterquery3[w].municipality_id == rs.city[m].id){
													ec_cum += Number(rs.masterquery3[w].ec_cum);
													ec_now += Number(rs.masterquery3[w].ec_now);
												}
											}
											$("#tbl_masterquery tbody").append(
												"<tr>"+
													"<td style='border:1px solid #000; color: #000;'>          "+rs.city[m].municipality_name+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+brgynum+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_a_t))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_a_t))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_cum))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_now))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
													"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
												"</tr>"
											)
										}
									}
									ec_cum = 0;
									ec_now = 0;
								}
								
							}
					}else if(y == 1){ // Agusan del Sur
						var family_a_t 		= 0;
						var person_a_t 		= 0;
						var family_cum_i	= 0;
						var family_now_i	= 0;
						var person_cum_i	= 0;
						var person_now_i	= 0;
						var family_cum_o	= 0;
						var family_now_o	= 0;
						var person_cum_o	= 0;
						var person_now_o	= 0;
						var family_cum_s_t	= 0;
						var family_now_s_t	= 0;
						var person_cum_s_t	= 0;
						var person_now_s_t	= 0;
						var bnum 			= 0;
						var ec_cum 			= 0;
						var ec_now 			= 0;
						var ec_cum_t 		= 0;
						var ec_now_t 		= 0;

						for(var k in rs.masterquery){
							if(rs.masterquery[k].provinceid == 2){
								family_a_t += Number(rs.masterquery[k].family_a_t);
								person_a_t += Number(rs.masterquery[k].person_a_t);
								family_cum_i += Number(rs.masterquery[k].family_cum_i);
								family_now_i += Number(rs.masterquery[k].family_now_i);
								person_cum_i += Number(rs.masterquery[k].person_cum_i);
								person_now_i += Number(rs.masterquery[k].person_now_i);
								family_cum_o += Number(rs.masterquery[k].family_cum_o);
								family_now_o += Number(rs.masterquery[k].family_now_o);
								person_cum_o += Number(rs.masterquery[k].person_cum_o);
								person_now_o += Number(rs.masterquery[k].person_now_o);
								family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
								family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
								person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
								person_now_s_t += Number(rs.masterquery[k].person_now_s_t);
							}
						}
						for(var f in rs.masterquery2){
							if(rs.masterquery2[f].provinceid == 2){
								bnum += Number(rs.masterquery2[f].brgynum);
							}
						}
						for(var w in rs.masterquery3){
							if(rs.masterquery3[w].provinceid == 2){
								ec_cum_t += Number(rs.masterquery3[w].ec_cum);
								ec_now_t += Number(rs.masterquery3[w].ec_now);
							}
						}
						$("#tbl_masterquery tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>      <b>"+provinces[y].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color: #000; background-color:#BFBFBF; color: #000; '>"+addComma(isnull(person_now_s_t))+"</td>"+
							"</tr>"
						)
						for(var m in rs.city){
							if(rs.city[m].provinceid == 2){
								for(var h in rs.masterquery){
									for(var f in rs.masterquery2){
										if(rs.masterquery2[f].municipality_id == rs.city[m].id){
											var brgynum = Number(rs.masterquery2[f].brgynum);
											break;
										}
									}
									if(rs.masterquery[h].municipality_id == rs.city[m].id){
										for(var w in rs.masterquery3){
											if(rs.masterquery3[w].municipality_id == rs.city[m].id){
												ec_cum += Number(rs.masterquery3[w].ec_cum);
												ec_now += Number(rs.masterquery3[w].ec_now);
											}
										}
										$("#tbl_masterquery tbody").append(
											"<tr>"+
												"<td style='border:1px solid #000; color: #000;'>          "+rs.city[m].municipality_name+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+brgynum+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_cum))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_now))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
											"</tr>"
										)
									}
								}
								ec_cum = 0;
								ec_now = 0;
							}
						}
					}else if(y == 2){ // Surigao de Norte
						var family_a_t 		= 0;
						var person_a_t 		= 0;
						var family_cum_i 	= 0;
						var family_now_i 	= 0;
						var person_cum_i 	= 0;
						var person_now_i 	= 0;
						var family_cum_o 	= 0;
						var family_now_o 	= 0;
						var person_cum_o 	= 0;
						var person_now_o 	= 0;
						var family_cum_s_t 	= 0;
						var family_now_s_t 	= 0;
						var person_cum_s_t 	= 0;
						var person_now_s_t 	= 0;
						var bnum 			= 0;
						var ec_cum 			= 0;
						var ec_now 			= 0;
						var ec_cum_t 		= 0;
						var ec_now_t 		= 0;

						for(var k in rs.masterquery){
							if(rs.masterquery[k].provinceid == 3){
								family_a_t += Number(rs.masterquery[k].family_a_t);
								person_a_t += Number(rs.masterquery[k].person_a_t);
								family_cum_i += Number(rs.masterquery[k].family_cum_i);
								family_now_i += Number(rs.masterquery[k].family_now_i);
								person_cum_i += Number(rs.masterquery[k].person_cum_i);
								person_now_i += Number(rs.masterquery[k].person_now_i);
								family_cum_o += Number(rs.masterquery[k].family_cum_o);
								family_now_o += Number(rs.masterquery[k].family_now_o);
								person_cum_o += Number(rs.masterquery[k].person_cum_o);
								person_now_o += Number(rs.masterquery[k].person_now_o);
								family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
								family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
								person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
								person_now_s_t += Number(rs.masterquery[k].person_now_s_t);
							}
						}
						for(var f in rs.masterquery2){
							if(rs.masterquery2[f].provinceid == 3){
								bnum += Number(rs.masterquery2[f].brgynum);
							}
						}
						for(var w in rs.masterquery3){
							if(rs.masterquery3[w].provinceid == 3){
								ec_cum_t += Number(rs.masterquery3[w].ec_cum);
								ec_now_t += Number(rs.masterquery3[w].ec_now);
							}
						}
						$("#tbl_masterquery tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>      <b>"+provinces[y].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43 ; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_s_t))+"</td>"+
							"</tr>"
						)
						for(var m in rs.city){
							if(rs.city[m].provinceid == 3){
								for(var h in rs.masterquery){
									for(var f in rs.masterquery2){
										if(rs.masterquery2[f].municipality_id == rs.city[m].id){
											var brgynum = Number(rs.masterquery2[f].brgynum);
											break;
										}
									}
									if(rs.masterquery[h].municipality_id == rs.city[m].id){
										for(var w in rs.masterquery3){
											if(rs.masterquery3[w].municipality_id == rs.city[m].id){
												ec_cum += Number(rs.masterquery3[w].ec_cum);
												ec_now += Number(rs.masterquery3[w].ec_now);
											}
										}
										$("#tbl_masterquery tbody").append(
											"<tr>"+
												"<td style='border:1px solid #000; color: #000;'>          "+rs.city[m].municipality_name+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+brgynum+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_cum))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_now))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
											"</tr>"
										)
									}
								}
								ec_cum = 0;
								ec_now = 0;
							}
						}
					}else if(y == 3){ // Surigao del Sur
						var family_a_t 		= 0;
						var person_a_t 		= 0;
						var family_cum_i 	= 0;
						var family_now_i 	= 0;
						var person_cum_i 	= 0;
						var person_now_i 	= 0;
						var family_cum_o 	= 0;
						var family_now_o 	= 0;
						var person_cum_o 	= 0;
						var person_now_o 	= 0;
						var family_cum_s_t 	= 0;
						var family_now_s_t 	= 0;
						var person_cum_s_t 	= 0;
						var person_now_s_t 	= 0;
						var bnum 			= 0;
						var ec_cum 			= 0;
						var ec_now 			= 0;
						var ec_cum_t 		= 0;
						var ec_now_t 		= 0;

						for(var k in rs.masterquery){
							if(rs.masterquery[k].provinceid == 4){
								family_a_t += Number(rs.masterquery[k].family_a_t);
								person_a_t += Number(rs.masterquery[k].person_a_t);
								family_cum_i += Number(rs.masterquery[k].family_cum_i);
								family_now_i += Number(rs.masterquery[k].family_now_i);
								person_cum_i += Number(rs.masterquery[k].person_cum_i);
								person_now_i += Number(rs.masterquery[k].person_now_i);
								family_cum_o += Number(rs.masterquery[k].family_cum_o);
								family_now_o += Number(rs.masterquery[k].family_now_o);
								person_cum_o += Number(rs.masterquery[k].person_cum_o);
								person_now_o += Number(rs.masterquery[k].person_now_o);
								family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
								family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
								person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
								person_now_s_t += Number(rs.masterquery[k].person_now_s_t);
							}
						}
						for(var f in rs.masterquery2){
							if(rs.masterquery2[f].provinceid == 4){
								bnum += Number(rs.masterquery2[f].brgynum);
							}
						}
						for(var w in rs.masterquery3){
							if(rs.masterquery3[w].provinceid == 4){
								ec_cum_t += Number(rs.masterquery3[w].ec_cum);
								ec_now_t += Number(rs.masterquery3[w].ec_now);
							}
						}
						$("#tbl_masterquery tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>      <b>"+provinces[y].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#FFCE43; color:#000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_s_t))+"</td>"+
							"</tr>"
						)
						for(var m in rs.city){
							if(rs.city[m].provinceid == 4){
								for(var h in rs.masterquery){
									for(var f in rs.masterquery2){
										if(rs.masterquery2[f].municipality_id == rs.city[m].id){
											var brgynum = Number(rs.masterquery2[f].brgynum);
											break;
										}
									}
									if(rs.masterquery[h].municipality_id == rs.city[m].id){
										for(var w in rs.masterquery3){
											if(rs.masterquery3[w].municipality_id == rs.city[m].id){
												ec_cum += Number(rs.masterquery3[w].ec_cum);
												ec_now += Number(rs.masterquery3[w].ec_now);
											}
										}
										$("#tbl_masterquery tbody").append(
											"<tr>"+
												"<td style='border:1px solid #000; color: #000'>          "+rs.city[m].municipality_name+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+brgynum+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(ec_cum))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(ec_now))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
											"</tr>"
										)
									}
								}
								ec_cum = 0;
								ec_now = 0;
							}
						}
					}else if(y == 4){ // Dinagat Islands
						var family_a_t 		= 0;
						var person_a_t 		= 0;
						var family_cum_i 	= 0;
						var family_now_i 	= 0;
						var person_cum_i 	= 0;
						var person_now_i 	= 0;
						var family_cum_o 	= 0;
						var family_now_o 	= 0;
						var person_cum_o 	= 0;
						var person_now_o 	= 0;
						var family_cum_s_t 	= 0;
						var family_now_s_t 	= 0;
						var person_cum_s_t 	= 0;
						var person_now_s_t 	= 0;
						var bnum 			= 0;
						var ec_cum 			= 0;
						var ec_now 			= 0;
						var ec_cum_t 		= 0;
						var ec_now_t 		= 0;

						for(var k in rs.masterquery){
							if(rs.masterquery[k].provinceid == 5){
								family_a_t += Number(rs.masterquery[k].family_a_t);
								person_a_t += Number(rs.masterquery[k].person_a_t);
								family_cum_i += Number(rs.masterquery[k].family_cum_i);
								family_now_i += Number(rs.masterquery[k].family_now_i);
								person_cum_i += Number(rs.masterquery[k].person_cum_i);
								person_now_i += Number(rs.masterquery[k].person_now_i);
								family_cum_o += Number(rs.masterquery[k].family_cum_o);
								family_now_o += Number(rs.masterquery[k].family_now_o);
								person_cum_o += Number(rs.masterquery[k].person_cum_o);
								person_now_o += Number(rs.masterquery[k].person_now_o);
								family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
								family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
								person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
								person_now_s_t += Number(rs.masterquery[k].person_now_s_t);
							}
						}
						for(var f in rs.masterquery2){
							if(rs.masterquery2[f].provinceid == 5){
								bnum += Number(rs.masterquery2[f].brgynum);
							}
						}
						for(var w in rs.masterquery3){
							if(rs.masterquery3[w].provinceid == 5){
								ec_cum_t += Number(rs.masterquery3[w].ec_cum);
								ec_now_t += Number(rs.masterquery3[w].ec_now);
							}
						}
						$("#tbl_masterquery tbody").append(
							"<tr style='background-color:#FFCE43; color: #000;'>"+
								"<tr>"+
								"<td style='border:1px solid #000; background-color:#BFBFBF; color: #000;'>      <b>"+provinces[y].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#BFBFBF; color: #000;'>"+addComma(isnull(person_now_s_t))+"</td>"+
							"</tr>"
						)
						for(var m in rs.city){
							if(rs.city[m].provinceid == 5){
								for(var h in rs.masterquery){
									for(var f in rs.masterquery2){
										if(rs.masterquery2[f].municipality_id == rs.city[m].id){
											var brgynum = Number(rs.masterquery2[f].brgynum);
											break;
										}
									}
									if(rs.masterquery[h].municipality_id == rs.city[m].id){
										for(var w in rs.masterquery3){
											if(rs.masterquery3[w].municipality_id == rs.city[m].id){
												ec_cum += Number(rs.masterquery3[w].ec_cum);
												ec_now += Number(rs.masterquery3[w].ec_now);
											}
										}
										$("#tbl_masterquery tbody").append(
											"<tr>"+
												"<td style='border:1px solid #000; color: #000;'>          "+rs.city[m].municipality_name+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+brgynum+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_a_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_cum))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_now))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
												"<td style='text-align:center; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
											"</tr>"
										)
									}
								}
								ec_cum = 0;
								ec_now = 0;
							}
						}
					}


				}

		// End of Master Query ===================================================================================================================================================


		// MASTER QUERY REVISION =================================================================================================================================================
				$("#tbl_masterquery_rev tbody").empty();

				$("#tbl_masterquery_rev_summary tbody").empty();

				$("#tbl_cost_assistance_summary tbody").empty();

				for(var p in provinces){

					var family_a_t 		= 0;
					var person_a_t 		= 0;
					var family_cum_i 	= 0;
					var family_now_i 	= 0;
					var person_cum_i 	= 0;
					var person_now_i 	= 0;
					var family_cum_o 	= 0;
					var family_now_o 	= 0;
					var person_cum_o 	= 0;
					var person_now_o 	= 0;
					var family_cum_s_t 	= 0;
					var family_now_s_t 	= 0;
					var person_cum_s_t 	= 0;
					var person_now_s_t 	= 0;
					var bnum 			= 0;
					var ec_cum 			= 0;
					var ec_now 			= 0;
					var ec_cum_t 		= 0;
					var ec_now_t 		= 0;
					var tott_d 			= 0;
					var tot_d 			= 0;
					var part_d 			= 0;

					var rdswd_asst 		= 0;
					var rlgu_asst 		= 0;
					var rngo_asst 		= 0;
					var rtotal_asst 	= 0;

					var all_affected_f 		= 0;
					var all_affected_p 		= 0;
					var all_affected_brgy 	= 0;

					for(var k in rs.masterquery){
						if(rs.masterquery[k].provinceid == provinces[p].id){

							for(var sd in rs.all_affected){
								if(rs.all_affected[sd].municipality_id == rs.masterquery[k].municipality_id){
									all_affected_f = Number(rs.all_affected[sd].fam_no);
									all_affected_p = Number(rs.all_affected[sd].person_no);
									break;
								}
							}

							all_affected_f = (isnull(rs.masterquery[k].family_a_t) >= all_affected_f ? isnull(rs.masterquery[k].family_a_t) : all_affected_f);
							all_affected_p = (isnull(rs.masterquery[k].person_a_t) >= all_affected_p ? isnull(rs.masterquery[k].person_a_t) : all_affected_p);

							family_a_t += Number(all_affected_f); //Number(rs.masterquery[k].family_a_t);
							person_a_t += Number(all_affected_p); //Number(rs.masterquery[k].person_a_t);
							family_cum_i += Number(rs.masterquery[k].family_cum_i);
							family_now_i += Number(rs.masterquery[k].family_now_i);
							person_cum_i += Number(rs.masterquery[k].person_cum_i);
							person_now_i += Number(rs.masterquery[k].person_now_i);
							family_cum_o += Number(rs.masterquery[k].family_cum_o);
							family_now_o += Number(rs.masterquery[k].family_now_o);
							person_cum_o += Number(rs.masterquery[k].person_cum_o);
							person_now_o += Number(rs.masterquery[k].person_now_o);
							family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
							family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
							person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
							person_now_s_t += Number(rs.masterquery[k].person_now_s_t);

							all_affected_f = 0;
							all_affected_p = 0;

						}
					}
					for(var f in rs.masterquery2){
						if(rs.masterquery2[f].provinceid == provinces[p].id){

							// for(var cd in rs.all_affected){
							// 	if(rs.all_affected[cd].municipality_id == rs.masterquery2[f].municipality_id){
							// 		all_affected_brgy = Number(rs.all_affected[cd].brgy_affected);
							// 	}
							// }

							// all_affected_brgy = (isnull(rs.masterquery2[f].brgynum) >= all_affected_brgy ? isnull(rs.masterquery2[f].brgynum) : all_affected_brgy);

							bnum += Number(rs.masterquery2[f].brgynum);

						}
					}
					for(var w in rs.masterquery3){
						if(rs.masterquery3[w].provinceid == provinces[p].id){
							ec_cum_t += Number(rs.masterquery3[w].ec_cum);
							ec_now_t += Number(rs.masterquery3[w].ec_now);
						}
					}

					for(var d in rs.query_damage_per_brgy){
						if(rs.query_damage_per_brgy[d].provinceid == provinces[p].id){
							tot_d += Number(rs.query_damage_per_brgy[d].totally_damaged);
							part_d += Number(rs.query_damage_per_brgy[d].partially_damaged);
						}
					}

					tott_d = Number(tot_d) + Number(part_d);

					for(var a in rs.query_asst){
						if(rs.query_asst[a].provinceid == provinces[p].id){
							rdswd_asst += Number(rs.query_asst[a].dswd_asst);
							rlgu_asst += Number(rs.query_asst[a].lgu_asst);
							rngo_asst += Number(rs.query_asst[a].ngo_asst);
						}
					}

					for(var xd in rs.query_damage_per_brgy){
						if(rs.query_damage_per_brgy[xd].provinceid == provinces[p].id){
							rlgu_asst += Number(rs.query_damage_per_brgy[xd].costasst_brgy);
						}
					}

					rtotal_asst = Number(rdswd_asst) + Number(rlgu_asst) + Number(rngo_asst);

					if(Number(family_a_t) > 0){

						$("#tbl_masterquery_rev tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000; padding-left: 5px'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_now_i))+"</td>"+
								// "<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'></td>"+
								// "<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(tott_d))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(tot_d))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(part_d))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addCommaMoney(isnull(rdswd_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addCommaMoney(isnull(rlgu_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addCommaMoney(isnull(rngo_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addCommaMoney(isnull(rtotal_asst))+"</td>"+
							"</tr>"
						)
					}
					//REPORT SUMMARY PROVINCE

					if(Number(family_a_t) > 0){

						$("#tbl_masterquery_rev_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(person_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(tott_d))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(tot_d))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addComma(isnull(part_d))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addCommaMoney(isnull(rdswd_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addCommaMoney(isnull(rlgu_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addCommaMoney(isnull(rngo_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'>"+addCommaMoney(isnull(rtotal_asst))+"</td>"+
							"</tr>"
						)

					}

					if(Number(rtotal_asst) > 0 ){

						$("#tbl_cost_assistance_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(rdswd_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(rlgu_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(rngo_asst))+"</td>"+
								"<td style='text-align:right; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(rtotal_asst))+"</td>"+
							"</tr>"
						)

					}



					if(Number(family_a_t) > 0){
						$("#tbl_materquery_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(bnum))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_a_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_a_t))+"</td>"+
							"</tr>"
						);
					}

					if(Number(ec_cum_t) > 0 && Number(family_cum_i) > 0 && Number(person_cum_i) > 0){
						$("#tbl_evac_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(ec_cum_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(ec_now_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_now_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_cum_i))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_now_i))+"</td>"+
							"</tr>"
						);
					}

					if(Number(family_cum_o) > 0 && Number(person_cum_o) > 0){
						$("#tbl_evac_outside_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_now_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_cum_o))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_now_o))+"</td>"+
							"</tr>"
						);
					}

					if(Number(family_cum_s_t) > 0 && Number(person_cum_s_t) > 0){
						$("#tbl_displaced_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(family_now_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_cum_s_t))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(person_now_s_t))+"</td>"+
							"</tr>"
						);
					}

					if(Number(tott_d) > 0){
						$("#tbl_damaged_summary tbody").append(
							"<tr>"+
								"<td style='border:1px solid #000; background-color:#B6DDE8; color: #000;'><b>"+provinces[p].name+"</b></td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(tott_d))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(tot_d))+"</td>"+
								"<td style='text-align:center; font-weight:bold; border:1px solid #000; background-color:#B6DDE8; color: #000;'>"+addComma(isnull(part_d))+"</td>"+
							"</tr>"
						);
					}

					for(var mm in rs.city){

						var btot_d 			= 0;
						var bpart_d 		= 0;
						var btott_d 		= 0;

						var bdswd_asst 		= 0;
						var blgu_asst 		= 0;
						var bngo_asst 		= 0;
						var btotal_asst 	= 0;

						var brgynum 		= 0;

						var all_affected_f 		= 0;
						var all_affected_p 		= 0;
						var all_affected_brgy 	= 0;

						if(rs.city[mm].provinceid == provinces[p].id){
							for(var h in rs.masterquery){
								for(var f in rs.masterquery2){
									if(rs.masterquery2[f].municipality_id == rs.city[mm].id){
										var brgynum = Number(rs.masterquery2[f].brgynum);
										break;
									}else{
										var brgynum = 0;
									}
								}
								if(rs.masterquery[h].municipality_id == rs.city[mm].id){
									for(var w in rs.masterquery3){
										if(rs.masterquery3[w].municipality_id == rs.city[mm].id){
											ec_cum += Number(rs.masterquery3[w].ec_cum);
											ec_now += Number(rs.masterquery3[w].ec_now);
										}
									}

									for(var d in rs.query_damage_per_brgy){
										if(rs.query_damage_per_brgy[d].municipality_id == rs.city[mm].id){
											btot_d += Number(rs.query_damage_per_brgy[d].totally_damaged);
											bpart_d += Number(rs.query_damage_per_brgy[d].partially_damaged);
										}
									}

									btott_d = Number(btot_d) + Number(bpart_d);

									for(var a in rs.query_asst){
										if(rs.query_asst[a].municipality_id == rs.city[mm].id){
											bdswd_asst += Number(rs.query_asst[a].dswd_asst);
											blgu_asst += Number(rs.query_asst[a].lgu_asst);
											bngo_asst += Number(rs.query_asst[a].ngo_asst);
										}
									}

									for(var d in rs.query_damage_per_brgy){
										if(rs.query_damage_per_brgy[d].municipality_id == rs.city[mm].id){
											blgu_asst += Number(rs.query_damage_per_brgy[d].costasst_brgy);
										}
									}

									for(var xd in rs.all_affected){
										if(rs.all_affected[xd].municipality_id == rs.city[mm].id){
											all_affected_f += Number(rs.all_affected[xd].fam_no);
											all_affected_p += Number(rs.all_affected[xd].person_no);
											all_affected_brgy += Number(rs.all_affected[xd].brgy_affected);
										}
									}

									all_affected_f = (isnull(rs.masterquery[h].family_a_t) >= all_affected_f ? isnull(rs.masterquery[h].family_a_t) : all_affected_f);
									all_affected_p = (isnull(rs.masterquery[h].person_a_t) >= all_affected_p ? isnull(rs.masterquery[h].person_a_t) : all_affected_p);
									all_affected_brgy = (isnull(brgynum) >= all_affected_brgy ? isnull(brgynum) : all_affected_brgy);

									btotal_asst = Number(bdswd_asst) + Number(blgu_asst) + Number(bngo_asst);

									$("#tbl_masterquery_rev tbody").append(
										"<tr style='cursor:pointer' class='contextmenu_click' id='contextmenu_click."+rs.city[mm].id+"'>"+
											"<td style='border:1px solid #000; color: #000; background-color: #B6DDE8; padding-left: 20px'><b>"+rs.city[mm].municipality_name.toUpperCase()+"</b></td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'></td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'></td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(all_affected_brgy))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(all_affected_f))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(all_affected_p))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(ec_cum))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(ec_now))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(btott_d))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(btot_d))+"</td>"+
											"<td style='font-weight: bold; text-align:center; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addComma(isnull(bpart_d))+"</td>"+
											"<td style='font-weight: bold; text-align:right; font-weight:bold; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addCommaMoney(isnull(bdswd_asst))+"</td>"+
											"<td style='font-weight: bold; text-align:right; font-weight:bold; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addCommaMoney(isnull(blgu_asst))+"</td>"+
											"<td style='font-weight: bold; text-align:right; font-weight:bold; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addCommaMoney(isnull(bngo_asst))+"</td>"+
											"<td style='font-weight: bold; text-align:right; font-weight:bold; border:1px solid #000; color: #000; background-color: #B6DDE8'>"+addCommaMoney(isnull(btotal_asst))+"</td>"+
										"</tr>"
									)
	
									//REPORT SUMMARY CITY/MUNICIPALITY

									if(Number(all_affected_f) > 0){

										$("#tbl_materquery_summary tbody").append(
											"<tr>"+
												"<td style='font-weight: lighter; border:1px solid #000; color: #000; padding-left: 2px'>    "+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(all_affected_brgy))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(all_affected_f))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(all_affected_p))+"</td>"+
											"</tr>"
										);

										$("#tbl_masterquery_rev_summary tbody").append(
											"<tr style='cursor:pointer'>"+
												"<td style='border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF; padding-left: 20px'>"+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(all_affected_brgy))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(all_affected_f))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(all_affected_p))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(ec_cum))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(ec_now))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(btott_d))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(btot_d))+"</td>"+
												"<td style='font-weight: lighter; text-align:center; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addComma(isnull(bpart_d))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addCommaMoney(isnull(bdswd_asst))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addCommaMoney(isnull(blgu_asst))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addCommaMoney(isnull(bngo_asst))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; background-color: #FFFFFF'>"+addCommaMoney(isnull(btotal_asst))+"</td>"+
											"</tr>"
										)

									}

									if(Number(btotal_asst) > 0){

										$("#tbl_cost_assistance_summary tbody").append(
											"<tr style='cursor:pointer'>"+
												"<td style='border:1px solid #000; color: #000; font-family: Arial; padding-left: 20px'>"+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(bdswd_asst))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(blgu_asst))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(bngo_asst))+"</td>"+
												"<td style='font-weight: lighter; text-align:right; border:1px solid #000; color: #000; font-family: Arial; padding-right: 3px'>"+addCommaMoney(isnull(btotal_asst))+"</td>"+
											"</tr>"
										)

									}

									if(Number(ec_cum) > 0){
										$("#tbl_evac_summary tbody").append(
											"<tr>"+
												"<td style='font-weight: lighter; border:1px solid #000; color: #000; padding-left: 2px'>    "+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_cum))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(ec_now))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_i))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_i))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_i))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_i))+"</td>"+
											"</tr>"
										);
									}

									if(Number(rs.masterquery[h].family_cum_o) > 0){
										$("#tbl_evac_outside_summary tbody").append(
											"<tr>"+
												"<td style='font-weight: lighter; border:1px solid #000; color: #000; padding-left: 2px'>    "+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_o))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_o))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_o))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_o))+"</td>"+
											"</tr>"
										);
									}

									if(Number(rs.masterquery[h].family_cum_s_t) > 0){
										$("#tbl_displaced_summary tbody").append(
											"<tr>"+
												"<td style='font-weight: lighter; border:1px solid #000; color: #000; padding-left: 2px'>    "+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_cum_s_t))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].family_now_s_t))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_cum_s_t))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(rs.masterquery[h].person_now_s_t))+"</td>"+
											"</tr>"
										);
									}

									if(Number(btott_d) > 0){
										$("#tbl_damaged_summary tbody").append(
											"<tr>"+
												"<td style='font-weight: lighter; border:1px solid #000; color: #000; padding-left: 2px'>    "+rs.city[mm].municipality_name.toUpperCase()+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(btott_d))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(btot_d))+"</td>"+
												"<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(isnull(bpart_d))+"</td>"+
											"</tr>"
										);
									}
								}
							}

							ec_cum = 0;
							ec_now = 0;
							brgynum = 0;

							for(var m in rs.rs){

								if(rs.city[mm].id == rs.rs[m].municipality_id){
									if(m > 0){
										// convert evacuation center name to "dash" if the EC is same as previous
										//if((rs.rs[m].evacuation_name.toLowerCase() == rs.rs[m-1].evacuation_name.toLowerCase()) && (rs.rs[m].municipality_id == rs.rs[m-1].municipality_id)){
										//	var evac = "";
										//}else{
											var evac = rs.rs[m].evacuation_name;
										//}
									}else{
										var evac = rs.rs[m].evacuation_name;
									}

									if(m == 0){

										for(var ki in rs.brgy){

											if(rs.brgy[ki].id == rs.rs[m].brgy_located_ec){

												var brgylocec = rs.brgy[ki].brgy_name;

											}

										}

									}else{

										// convert evacuation barangay name to "dash" if the barangay is same as previous
										//if((rs.rs[m].brgy_located_ec == rs.rs[m-1].brgy_located_ec)){

											//var brgylocec = "-";

										//}else{

											for(var ki in rs.brgy){

												if(rs.brgy[ki].id == rs.rs[m].brgy_located_ec){

													var brgylocec = rs.brgy[ki].brgy_name;

												}

											}

										//}


									}


									$("#tbl_masterquery_rev tbody").append(
										"<tr style='cursor:pointer' class='contextmenu_click_ec contextmenu_click_ec."+rs.rs[m].id+"'>"+
											"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; background-color: #fff'></td>"+
											"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; background-color: #fff'>"+isnull(brgylocec).toUpperCase()+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:left; padding:2px; background-color: #fff'>"+isnulldo(evac.toUpperCase())+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'></td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'></td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'></td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].ec_cum)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].ec_now)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].family_cum)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].family_now)+"</td>"+
						  					// "<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					// "<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].person_cum)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].person_now)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].family_cum)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].family_now)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].person_cum)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>"+isnull(rs.rs[m].person_now)+"</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
						  					"<td style='border: 1px solid #000; color: #000; text-align:center; padding:2px; background-color: #fff'>-</td>"+
										"</tr>"
									)
								}
							}
						}
						
					}

				}

				chart_affprov 		= [];
				chart_affprovdrill 	= [];
				chart_affmunisall 	= [];
				chart_affprov 		= rs.aff_prov;
				chart_affprovdrill 	= rs.aff_munis_drill;
				chart_affmunisall 	= rs.aff_munis_all;

				

		// END OF MASTER QUERY REVISION =============================================================================================================================================



				var family_a_t 		= 0;
				var person_a_t 		= 0;
				var family_cum_i 	= 0;
				var family_now_i 	= 0;
				var person_cum_i 	= 0;
				var person_now_i 	= 0;
				var family_cum_o 	= 0;
				var family_now_o 	= 0;
				var person_cum_o 	= 0;
				var person_now_o 	= 0;
				var family_cum_s_t 	= 0;
				var family_now_s_t 	= 0;
				var person_cum_s_t 	= 0;
				var person_now_s_t 	= 0;
				var bnum 			= 0;
				var ec_cum_t 		= 0;
				var ec_now_t 		= 0;
				var tot_d			= 0;
				var part_d 			= 0;
				var tott_d 			= 0;
				var tdswd_asst 		= 0;
				var tlgu_asst 		= 0;
				var tngo_asst 		= 0;
				var ttotal_asst 	= 0;
				var all_affected_f  = 0;
				var all_affected_p  = 0;

				for(var k in rs.masterquery){

					for(var xd in rs.all_affected){
						if(rs.all_affected[xd].municipality_id == rs.masterquery[k].municipality_id){
							all_affected_f += Number(rs.all_affected[xd].fam_no);
							all_affected_p += Number(rs.all_affected[xd].person_no);
							break;
						}
					}

					all_affected_f = (isnull(rs.masterquery[k].family_a_t) >= all_affected_f ? isnull(rs.masterquery[k].family_a_t) : all_affected_f);
					all_affected_p = (isnull(rs.masterquery[k].person_a_t) >= all_affected_p ? isnull(rs.masterquery[k].person_a_t) : all_affected_p);

					family_a_t += Number(all_affected_f); //Number(rs.masterquery[k].family_a_t);
					person_a_t += Number(all_affected_p); //Number(rs.masterquery[k].person_a_t);
					family_cum_i += Number(rs.masterquery[k].family_cum_i);
					family_now_i += Number(rs.masterquery[k].family_now_i);
					person_cum_i += Number(rs.masterquery[k].person_cum_i);
					person_now_i += Number(rs.masterquery[k].person_now_i);
					family_cum_o += Number(rs.masterquery[k].family_cum_o);
					family_now_o += Number(rs.masterquery[k].family_now_o);
					person_cum_o += Number(rs.masterquery[k].person_cum_o);
					person_now_o += Number(rs.masterquery[k].person_now_o);
					family_cum_s_t += Number(rs.masterquery[k].family_cum_s_t);
					family_now_s_t += Number(rs.masterquery[k].family_now_s_t);
					person_cum_s_t += Number(rs.masterquery[k].person_cum_s_t);
					person_now_s_t += Number(rs.masterquery[k].person_now_s_t);

					all_affected_f  = 0;
					all_affected_p  = 0;
					
				}

				for(var f in rs.masterquery2){
					bnum += Number(rs.masterquery2[f].brgynum);
				}

				for(var w in rs.masterquery3){
					ec_cum_t += Number(rs.masterquery3[w].ec_cum);
					ec_now_t += Number(rs.masterquery3[w].ec_now);
				}

				for(var d in rs.query_damage_per_brgy){
					tot_d += Number(rs.query_damage_per_brgy[d].totally_damaged);
					part_d += Number(rs.query_damage_per_brgy[d].partially_damaged);
				}

				tott_d = Number(tot_d) + Number(part_d);

				for(var a in rs.query_asst){
					tdswd_asst += Number(rs.query_asst[a].dswd_asst);
					tlgu_asst += Number(rs.query_asst[a].lgu_asst);
					tngo_asst += Number(rs.query_asst[a].ngo_asst);
				}

				for(var d in rs.query_damage_per_brgy){
					tlgu_asst += Number(rs.query_damage_per_brgy[d].costasst_brgy);
				}

				ttotal_asst = Number(tdswd_asst) + Number(tlgu_asst) + Number(tngo_asst);

				$('#totalbrgy').text(isnull(bnum));
				$('#totalfamily').text(addComma(isnull(family_a_t)));
				$('#totalperson').text(addComma(isnull(person_a_t)));

				$('#totalbrgy_summary').text(isnull(bnum));
				$('#totalfamily_summary').text(addComma(isnull(family_a_t)));
				$('#totalperson_summary').text(addComma(isnull(person_a_t)));

				$('#tbl_materquery_summary_brgy').text(addComma(isnull(bnum)));
				$('#tbl_materquery_summary_fam').text(addComma(isnull(family_a_t)));
				$('#tbl_materquery_summary_person').text(addComma(isnull(person_a_t)));

				$('#totalec_cum_summary').text(addComma(isnull(ec_cum_t)));
				$('#totalec_now_summary').text(addComma(isnull(ec_now_t)));
				$('#totalinsideec_fam_cum_summary').text(addComma(isnull(family_cum_i)));
				$('#totalinsideec_fam_now_summary').text(addComma(isnull(family_now_i)));
				$('#totalinsideec_person_cum_summary').text(addComma(isnull(person_cum_i)));
				$('#totalinsideec_person_now_summary').text(addComma(isnull(person_now_i)));

				$('#totalec_cum').text(addComma(isnull(ec_cum_t)));
				$('#totalec_now').text(addComma(isnull(ec_now_t)));
				$('#totalinsideec_fam_cum').text(addComma(isnull(family_cum_i)));
				$('#totalinsideec_fam_now').text(addComma(isnull(family_now_i)));
				$('#totalinsideec_person_cum').text(addComma(isnull(person_cum_i)));
				$('#totalinsideec_person_now').text(addComma(isnull(person_now_i)));

				$('#tbl_evac_summary_ec_cum').text(addComma(isnull(ec_cum_t)));
				$('#tbl_evac_summary_ec_now').text(addComma(isnull(ec_now_t)));
				$('#tbl_evac_summary_family_cum').text(addComma(isnull(family_cum_i)));
				$('#tbl_evac_summary_family_now').text(addComma(isnull(family_now_i)));
				$('#tbl_evac_summary_person_cum').text(addComma(isnull(person_cum_i)));
				$('#tbl_evac_summary_person_now').text(addComma(isnull(person_now_i)));

				$('#totaloutisideec_fam_cum').text(addComma(isnull(family_cum_o)));
				$('#totaloutisideec_fam_now').text(addComma(isnull(family_now_o)));
				$('#totaloutsideec_person_cum').text(addComma(isnull(person_cum_o)));
				$('#totaloutsideec_person_now').text(addComma(isnull(person_now_o)));

				$('#totaloutisideec_fam_cum_summary').text(addComma(isnull(family_cum_o)));
				$('#totaloutisideec_fam_now_summary').text(addComma(isnull(family_now_o)));
				$('#totaloutsideec_person_cum_summary').text(addComma(isnull(person_cum_o)));
				$('#totaloutsideec_person_now_summary').text(addComma(isnull(person_now_o)));

				$('#tbl_evac_outside_summary_family_cum').text(addComma(isnull(family_cum_o)));
				$('#tbl_evac_outside_summary_family_now').text(addComma(isnull(family_now_o)));
				$('#tbl_evac_outside_summary_person_cum').text(addComma(isnull(person_cum_o)));
				$('#tbl_evac_outside_summary_person_now').text(addComma(isnull(person_now_o)));

				$('#totalserved_fam_cum').text(addComma(isnull(family_cum_s_t)));
				$('#totalserved_fam_now').text(addComma(isnull(family_now_s_t)));
				$('#totalserved_person_cum').text(addComma(isnull(person_cum_s_t)));
				$('#totalserved_person_now').text(addComma(isnull(person_now_s_t)));

				$('#totalserved_fam_cum_summary').text(addComma(isnull(family_cum_s_t)));
				$('#totalserved_fam_now_summary').text(addComma(isnull(family_now_s_t)));
				$('#totalserved_person_cum_summary').text(addComma(isnull(person_cum_s_t)));
				$('#totalserved_person_now_summary').text(addComma(isnull(person_now_s_t)));

				$('#tbl_displaced_summary_family_cum').text(addComma(isnull(family_cum_s_t)));
				$('#tbl_displaced_summary_family_now').text(addComma(isnull(family_now_s_t)));
				$('#tbl_displaced_summary_person_cum').text(addComma(isnull(person_cum_s_t)));
				$('#tbl_displaced_summary_person_now').text(addComma(isnull(person_now_s_t)));

				$('#tott_damaged').text(addComma(isnull(tott_d)));
				$('#tot_damaged').text(addComma(isnull(tot_d)));
				$('#part_damaged').text(addComma(isnull(part_d)));

				$('#tott_damaged_summary').text(addComma(isnull(tott_d)));
				$('#tot_damaged_summary').text(addComma(isnull(tot_d)));
				$('#part_damaged_summary').text(addComma(isnull(part_d)));
				
				$('#tbl_damaged_summary_tot').text(addComma(isnull(tott_d)));
				$('#tbl_damaged_summary_totally').text(addComma(isnull(tot_d)));
				$('#tbl_damaged_summary_patially').text(addComma(isnull(part_d)));

				$('#tdswd_asst').text(addCommaMoney(isnull(tdswd_asst)));
				$('#tlgu_asst').text(addCommaMoney(isnull(tlgu_asst)));
				$('#tngo_asst').text(addCommaMoney(isnull(tngo_asst)));
				$('#ttotal_asst').text(addCommaMoney(isnull(ttotal_asst)));

				$('#tdswd_asst_summary').text(addCommaMoney(isnull(tdswd_asst)));
				$('#tlgu_asst_summary').text(addCommaMoney(isnull(tlgu_asst)));
				$('#tngo_asst_summary').text(addCommaMoney(isnull(tngo_asst)));
				$('#ttotal_asst_summary').text(addCommaMoney(isnull(ttotal_asst)));

				$('#tdswd_asst_summary_breakdown').text(addCommaMoney(isnull(tdswd_asst)));
				$('#tlgu_asst_summary_breakdown').text(addCommaMoney(isnull(tlgu_asst)));
				$('#tngo_asst_summary_breakdown').text(addCommaMoney(isnull(tngo_asst)));
				$('#ttotal_asst_summary_breakdown').text(addCommaMoney(isnull(ttotal_asst)));

				for(var v in provinces){

					var totalcc 		= 0;
					var tot_ccc 		= 0;
					var part_ccc 		= 0;
					var dead_ccc 		= 0;
					var injured_ccc 	= 0;
					var missing_ccc 	= 0;
					var dswd_ccc 		= 0;
					var lgu_ccc 		= 0;
					var ngo_ccc 		= 0;

					for(var q in rs.query_asst){

						if(provinces[v].id == rs.query_asst[q].provinceid){

							totalcc += (Number(rs.query_asst[q].dswd_asst) + Number(rs.query_asst[q].lgu_asst) + Number(rs.query_asst[q].ngo_asst));
							tot_ccc += Number(rs.query_asst[q].totally_damaged);
							part_ccc += Number(rs.query_asst[q].partially_damaged);
							dead_ccc += Number(rs.query_asst[q].dead);
							injured_ccc += Number(rs.query_asst[q].injured);
							missing_ccc += Number(rs.query_asst[q].missing);
							dswd_ccc += Number(rs.query_asst[q].dswd_asst);
							lgu_ccc += Number(rs.query_asst[q].lgu_asst);
							ngo_ccc += Number(rs.query_asst[q].ngo_asst);

							var lgu_cccc 		= lgu_ccc;

						}

					}

					for(var qq in rs.query_damage_per_brgy){
						if(provinces[v].id == rs.query_damage_per_brgy[qq].provinceid){
							lgu_cccc += Number(rs.query_damage_per_brgy[qq].costasst_brgy);
						}
					}

					for(var qq in rs.query_damage_per_brgy){
						if(provinces[v].id == rs.query_damage_per_brgy[qq].provinceid){
							totalcc += Number(rs.query_damage_per_brgy[qq].costasst_brgy);
						}
					}

					if(Number(tot_ccc) > 0 || Number(part_ccc) > 0 || Number(totalcc) > 0){

						$('#tbl_casualty_asst tbody').append(
							"<tr style='background-color:yellow'>"+
								"<th style='border: 1px solid #000; text-align:left; background-color: #BFBFBF; color: #000; padding-right: 5px'>    "+provinces[v].name+"</th>"+
								"<th style='border: 1px solid #000; text-align:center; background-color: #BFBFBF; color: #000; padding-right: 5px'>"+addComma(tot_ccc)+"</th>"+
								"<th style='border: 1px solid #000; text-align:center; background-color: #BFBFBF; color: #000; padding-right: 5px'>"+addComma(part_ccc)+"</th>"+
								"<th style='border: 1px solid #000; text-align:right; background-color: #BFBFBF; color: #000; padding-right: 5px'>"+addCommaMoney(totalcc)+"</th>"+
								"<th style='border: 1px solid #000; text-align:right; background-color: #BFBFBF; color: #000; padding-right: 5px'>"+addCommaMoney(dswd_ccc)+"</th>"+
								"<th style='border: 1px solid #000; text-align:right; background-color: #BFBFBF; color: #000; padding-right: 5px'>"+addCommaMoney(lgu_cccc)+"</th>"+
								"<th style='border: 1px solid #000; text-align:right; background-color: #BFBFBF; color: #000; padding-right: 5px'>"+addCommaMoney(ngo_ccc)+"</th>"+
							"</tr>"
						)
					}

					totalcc 		= 0;
					tot_ccc 		= 0;
					part_ccc 		= 0;
					dead_ccc 		= 0;
					injured_ccc 	= 0;
					missing_ccc 	= 0;
					dswd_ccc 		= 0;
					lgu_ccc 		= 0;
					ngo_ccc 		= 0;
					lgu_cccc 		= 0;

					for(var q in rs.query_asst){
						var total = 0;
						if(provinces[v].id == rs.query_asst[q].provinceid){
							total += (Number(rs.query_asst[q].dswd_asst) + Number(rs.query_asst[q].lgu_asst) + Number(rs.query_asst[q].ngo_asst));
							$('#tbl_casualty_asst tbody').append(
								"<tr style='color:#000; cursor:pointer; background-color: #DFDFDF' ondblclick='updateDamAss("+rs.query_asst[q].id+")' class='hoveredit'>"+
									"<th style='border: 1px solid #000; text-align:left'>        "+rs.query_asst[q].municipality_name+"</th>"+
									"<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_asst[q].totally_damaged)+"</th>"+
									"<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_asst[q].partially_damaged)+"</th>"+
									// "<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_asst[q].dead)+"</th>"+
									// "<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_asst[q].injured)+"</th>"+
									// "<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_asst[q].missing)+"</th>"+
									"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addCommaMoney(total)+"</th>"+
									"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addCommaMoney(rs.query_asst[q].dswd_asst)+"</th>"+
									"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addCommaMoney(rs.query_asst[q].lgu_asst)+"</th>"+
									"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addCommaMoney(rs.query_asst[q].ngo_asst)+"</th>"+
								"</tr>"
							)

							var brgy_ids = "";

							brgy_ids = rs.query_asst[q].brgy_id;
							if(isnull(brgy_ids) != "-"){
								brgy_ids = brgy_ids.split("|");
							
								for(var hq = 0 ; hq < brgy_ids.length ; hq++){

									for(var hh = 0 ; hh < rs.query_damage_per_brgy.length ; hh++){
										if(brgy_ids[hq] == rs.query_damage_per_brgy[hh].brgy_id){

											if(Number(rs.query_damage_per_brgy[hh].totally_damaged) > 0 || Number(rs.query_damage_per_brgy[hh].partially_damaged) > 0 || Number(rs.query_damage_per_brgy[hh].costasst_brgy) > 0){
												$('#tbl_casualty_asst tbody').append(
													"<tr style='color:#000; cursor:pointer'>"+
														"<th style='border: 1px solid #000; text-align:left'>            Brgy. "+rs.query_damage_per_brgy[hh].brgy_name+"</th>"+
														"<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_damage_per_brgy[hh].totally_damaged)+"</th>"+
														"<th style='border: 1px solid #000; text-align:center; padding-right: 5px'>"+addComma(rs.query_damage_per_brgy[hh].partially_damaged)+"</th>"+
														"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addCommaMoney(rs.query_damage_per_brgy[hh].costasst_brgy)+"</th>"+
														"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addComma(0)+"</th>"+
														"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addCommaMoney(rs.query_damage_per_brgy[hh].costasst_brgy)+"</th>"+
														"<th style='border: 1px solid #000; text-align:right; padding-right: 5px'>"+addComma(0)+"</th>"+
													"</tr>"
												)

											}

											break;

										}
									}

								}
							}
						}
					}

				}

				var total 		= 0;
				var tot_c 		= 0;
				var part_c 		= 0;
				var dead_c 		= 0;
				var injured_c 	= 0;
				var missing_c 	= 0;
				var dswd_c 		= 0;
				var lgu_c 		= 0;
				var ngo_c 		= 0;

				for(var q in rs.query_asst){
					total += (Number(rs.query_asst[q].dswd_asst) + Number(rs.query_asst[q].lgu_asst) + Number(rs.query_asst[q].ngo_asst));
					tot_c += Number(rs.query_asst[q].totally_damaged);
					part_c += Number(rs.query_asst[q].partially_damaged);
					dead_c += Number(rs.query_asst[q].dead);
					injured_c += Number(rs.query_asst[q].injured);
					missing_c += Number(rs.query_asst[q].missing);
					dswd_c += Number(rs.query_asst[q].dswd_asst);
					lgu_c += Number(rs.query_asst[q].lgu_asst);
					ngo_c += Number(rs.query_asst[q].ngo_asst);
				}

				$('#caraga_tot_c').text(addComma(tot_c));
				$('#caraga_part_c').text(addComma(part_c));
				$('#caraga_dead_c').text(addComma(dead_c));
				$('#caraga_injured_c').text(addComma(injured_c));
				$('#caraga_missing_c').text(addComma(missing_c));
				$('#caraga_dswd_c').text(addCommaMoney(dswd_c));
				$('#caraga_ngo_c').text(addCommaMoney(ngo_c));

				var lgu_cc 		= lgu_c;

				for(var q in rs.query_damage_per_brgy){
					lgu_cc += Number(rs.query_damage_per_brgy[q].costasst_brgy);
				}

				$('#caraga_lgu_c').text(addCommaMoney(lgu_cc));

				for(var q in rs.query_damage_per_brgy){
					lgu_c = Number(rs.query_damage_per_brgy[q].costasst_brgy);
					total += lgu_c;
				}

				$('#caraga_total_c').text(addCommaMoney(total));
				
				
			});

			$('#lgu_list_assistance tbody').empty();

			$('#tbl_cost_dswd_summary thead').empty();
			$('#tbl_cost_dswd_summary tbody').empty();

			var datas = {
				id : URLID()
			}

			$.getJSON("/Pages/get_dswd_assistance",datas,function(a){

				var k = a.length - 1;

				for(var i in provinces){
					var total = 0;
					for(var j in a){
						if(a[j].provinceid == provinces[i].id){
							total = total + parseFloat(a[j].cost) * parseFloat(a[j].quantity);
						}
					}
					$('#lgu_list_assistance tbody').append(
						"<tr>"+
							"<th style='background-color:#169F85; color:#fff' colspan='5'>"+provinces[i].name+"</th>"+
							"<th style='background-color:#169F85; color:#fff; text-align:right'>"+addCommaMoney(total)+"</th>"+
							"<th style='background-color:#169F85; color:#fff'></th>"+
						"</tr>"
					)

					for(var j in a){


						if(a[j].provinceid == provinces[i].id){

							var amt = parseFloat(a[j].cost) * parseFloat(a[j].quantity);

								if(j == 0){
									$('#lgu_list_assistance tbody').append(
										"<tr style='cursor:pointer' ondblclick='updateAssistanceList("+a[j].id+")'>"+
											"<th style='color:#000'>"+a[j].municipality_name+"</th>"+
											"<th style='color:#000'>"+isnull(a[j].fnfi_name)+"</th>"+
											"<th style='text-align:right; color:#000'>"+isnull(a[j].quantity)+"</th>"+
											"<th style='text-align:right; color:#000'>"+isnull(a[j].cost)+"</th>"+
											"<th style='text-align:right; color:#000'>"+isnull(todate(a[j].date_augmented))+"</th>"+
											"<th style='text-align:right; color:#000'>"+addCommaMoney(amt) +"</th>"+
											"<th style='text-align:center; color:#000'><button type='button' class='btn btn-danger btn-xs can_editasst' onclick='updateAssistanceList("+a[j].id+")'><i class='fa fa-exclamation-circle'></i></button></th>"+
										"</tr>"
									)
								}else{
									if(a[j].municipality_id == a[j-1].municipality_id){
										$('#lgu_list_assistance tbody').append(
											"<tr style='cursor:pointer' ondblclick='updateAssistanceList("+a[j].id+")'>"+
												"<th></th>"+
												"<th style='color:#000'>"+isnull(a[j].fnfi_name)+"</th>"+
												"<th style='text-align:right; color:#000'>"+isnull(a[j].quantity)+"</th>"+
												"<th style='text-align:right; color:#000'>"+isnull(a[j].cost)+"</th>"+
												"<th style='text-align:right; color:#000'>"+isnull(todate(a[j].date_augmented))+"</th>"+
												"<th style='text-align:right; color:#000'>       "+addCommaMoney(amt)+"</th>"+
												"<th style='text-align:center; color:#000'><button type='button' class='btn btn-danger btn-xs can_editasst' onclick='updateAssistanceList("+a[j].id+")'><i class='fa fa-exclamation-circle'></i></button></th>"+
											"</tr>"
										)
									}else{
										$('#lgu_list_assistance tbody').append(
											"<tr style='cursor:pointer' ondblclick='updateAssistanceList("+a[j].id+")'>"+
												"<th style='color:#000'>"+a[j].municipality_name+"</th>"+
												"<th style='color:#000'>"+isnull(a[j].fnfi_name)+"</th>"+
												"<th style='text-align:right; color:#000'>"+isnull(a[j].quantity)+"</th>"+
												"<th style='text-align:right; color:#000'>"+isnull(a[j].cost)+"</th>"+
												"<th style='text-align:right; color:#000'>"+isnull(todate(a[j].date_augmented))+"</th>"+
												"<th style='text-align:right; color:#000'>"+addCommaMoney(amt) +"</th>"+
												"<th style='text-align:center; color:#000'><button type='button' class='btn btn-danger btn-xs can_editasst' onclick='updateAssistanceList("+a[j].id+")'><i class='fa fa-exclamation-circle'></i></button></th>"+
											"</tr>"
										)
									}
								}
							}
						}
					}

					var tot_ffp = 0;
					var amt_ffp = 0;
					var amt_nfi = 0;

					for(var j in a){
						if(a[j].fnfi_name.includes("Family Food Pack")){
							tot_ffp += a[j].quantity;
							amt_ffp += (a[j].cost * a[j].quantity);
						}else{
							amt_nfi += (a[j].cost * a[j].quantity);
						}
					}

					$('#totffps').text(addComma(tot_ffp));
					$('#amtffps').text("PhP " + addCommaMoney(amt_ffp));
					$('#amtnfi').text("PhP " + addCommaMoney(amt_nfi));

			})

			$.getJSON("/Pages/get_dswd_assistance_summary",datas,function(a){

				let item_arr = [];
				let muni_arr = [];

				for(i  = 0 ; i < a.length ; i++){
					item_arr.push(a[i].fnfi_name)
				}

				item_arr = item_arr.filter((item, i, ar) => ar.indexOf(item) === i);

				item_arr.sort();

				let ffp = 0;
				for(i = 0 ; i < item_arr.length ; i++){
					if(item_arr[i].toUpperCase() === 'FAMILY FOOD PACK' || item_arr[i].toUpperCase() === 'FAMILY FOOD PACKS'){
						item_arr.splice(i,1);
						ffp += 1;
					}
				}

				if(ffp > 0){
					item_arr.unshift("Family Food Pack");
				}

				for(i  = 0 ; i < a.length ; i++){

					if(i === 0){
						muni_arr.push({
							provinceid 			: a[i].provinceid,
							province_name 		: a[i].province_name,
							municipality_id 	: a[i].municipality_id,
							municipality_name 	: a[i].municipality_name,
							items 				: []
						})
					}else{
						if(a[i].municipality_id !== a[i-1].municipality_id){
							muni_arr.push({
								provinceid 			: a[i].provinceid,
								province_name 		: a[i].province_name,
								municipality_id 	: a[i].municipality_id,
								municipality_name 	: a[i].municipality_name,
								items 				: []
							})
						}
					}
					
				}

				for(i = 0 ; i < muni_arr.length ; i++){
					for(j = 0 ; j < a.length ; j++){
						if(muni_arr[i].municipality_id === a[j].municipality_id){
							muni_arr[i].items.push({
								item_name 	: a[j].fnfi_name,
								qty 		: a[j].qty,
								cost 		: a[j].sub_cost
							})
						}
					}
				}

				$('#tbl_cost_dswd_summary thead').append(
					"<tr>"+
						"<th rowspan='3' class='report_summary_td'>PROVINCE/CITY/MUNICIPALITY</th>"+
						"<th colspan='"+(item_arr.length*2)+"' class='report_summary_td'>DSWD COST OF ASSISTANCE</th>"+
						"<th rowspan='3' class='report_summary_td'>TOTAL COST</th>"+
					"</tr>"
				);

				let table_str = "";
				let table_str2 = "";

				for(i = 0 ; i <item_arr.length ; i++){
					table_str += "<th colspan='2' class='report_summary_td'>"+item_arr[i].toUpperCase()+"</th>";
				}

				for(i = 0 ; i <item_arr.length ; i++){
					table_str2 += "<th class='report_summary_td'>QUANTITY</th><th class='report_summary_td'>COST</th>";
				}

				$('#tbl_cost_dswd_summary thead').append(
					"<tr>"+table_str+"</tr>"+
					"<tr>"+table_str2+"</tr>"
				);

				const p_items_td_qty = (p, muni, item) =>{
					let qty = 0;
					for(j = 0 ; j < muni.length ; j++){
						if(muni[j].provinceid === p){
							for(z = 0 ; z < muni[j].items.length ; z++){
								if(muni[j].items[z].item_name === item){
									qty += muni[j].items[z].qty;
								}
							}
						}
					}
					return qty;
				}

				const p_items_td_cost = (p, muni, item) =>{
					let cost = 0;
					for(j = 0 ; j < muni.length ; j++){
						if(muni[j].provinceid === p){
							for(z = 0 ; z < muni[j].items.length ; z++){
								if(muni[j].items[z].item_name === item){
									cost += muni[j].items[z].cost;
								}
							}
						}
					}
					return cost;
				}

				const p_items_td_total_cost = (p, muni) =>{
					let cost = 0;
					for(j = 0 ; j < muni.length ; j++){
						if(muni[j].provinceid === p){
							for(z = 0 ; z < muni[j].items.length ; z++){
								cost += muni[j].items[z].cost;
							}
						}
					}
					return cost;
				}


				const items_td_qty = (item, muni_items) =>{
					let qty = 0;
					for(j = 0 ; j < muni_items.length ; j++){
						if(muni_items[j].item_name === item){
							qty = muni_items[j].qty;
							break;
						}
					}
					return qty;
				}

				const items_td_cost = (item, muni_items) =>{
					let cost = 0;
					for(j = 0 ; j < muni_items.length ; j++){
						if(muni_items[j].item_name === item){
							cost = muni_items[j].cost;
							break;
						}
					}
					return cost;
				}

				const items_td_total_cost = (muni_items) =>{
					let cost = 0;
					for(j = 0 ; j < muni_items.length ; j++){
						cost += muni_items[j].cost;
					}
					return cost;
				}

				let str_items = "";
				let total_cost = 0;

				for(p = 0 ; p < provinces.length ; p++){
					let p_qty = 0;
					let p_str_items = "";

					for(k = 0 ; k < item_arr.length ; k++){
						p_qty += p_items_td_qty(provinces[p].id, muni_arr, item_arr[k]);
						p_str_items += "<td style='text-align:center; font-weight: bold; border:1px solid #000; color: #000;' class='report_summary_td'>"+addComma(p_items_td_qty(provinces[p].id, muni_arr, item_arr[k]))+
							"</td><td style='text-align:right; font-weight: bold; border:1px solid #000; color: #000; padding-right: 3px' class='report_summary_td'>"+addCommaMoney(p_items_td_cost(provinces[p].id, muni_arr, item_arr[k]))+"</td>";
					}

					if(Number(p_qty) > 0){
						$('#tbl_cost_dswd_summary tbody').append(
							"<tr>"+
								"<td style='text-align:left; font-weight: bold; border:1px solid #000; color: #000; padding-left: 3px' class='report_summary_td'>"+provinces[p].name+"</td>"+
								p_str_items+
								"<td style='text-align:right; font-weight: bold; border:1px solid #000; color: #000; padding-right: 3px' class='report_summary_td'>"+addCommaMoney(p_items_td_total_cost(provinces[p].id, muni_arr))+"</td>"+
							"</tr>"
						);
					}


					for(i = 0 ; i < muni_arr.length ; i++){

						if(muni_arr[i].provinceid === provinces[p].id){
							for(k = 0 ; k < item_arr.length ; k++){
								str_items += "<td style='text-align:center; font-weight: lighter; border:1px solid #000; color: #000;'>"+addComma(items_td_qty(item_arr[k],muni_arr[i].items))+
								"</td><td style='text-align:right; font-weight: lighter; border:1px solid #000; color: #000; padding-right: 3px'>"+addCommaMoney(items_td_cost(item_arr[k],muni_arr[i].items))+"</td>";
							}

							$('#tbl_cost_dswd_summary tbody').append(
								"<tr>"+
								"<td style='text-align:left; font-weight: lighter; border:1px solid #000; color: #000; padding-left: 3px'>   "+muni_arr[i].municipality_name.toUpperCase()+"</td>"+
								str_items+
								"<td style='text-align:right; font-weight: lighter; border:1px solid #000; color: #000; padding-right: 3px'>"+addCommaMoney(items_td_total_cost(muni_arr[i].items))+"</td>"+
								"</tr>"
							);
							str_items = "";
						}
					}	

				}

				const items_td_qty_footer = (item, muni) =>{
					let qty = 0;
					for(j = 0 ; j < muni.length ; j++){
						for(n = 0 ; n < muni[j].items.length ; n++){
							if(muni[j].items[n].item_name === item){
								qty += muni[j].items[n].qty;
							}
						}
					}
					return qty;
				}

				const items_td_cost_footer = (item, muni) =>{
					let cost = 0;
					for(j = 0 ; j < muni.length ; j++){
						for(n = 0 ; n < muni[j].items.length ; n++){
							if(muni[j].items[n].item_name === item){
								cost += muni[j].items[n].cost;
							}
						}
					}
					return cost;
				}

				const items_td_total_cost_footer = (muni) =>{
					let cost = 0;
					for(j = 0 ; j < muni.length ; j++){
						for(n = 0 ; n < muni[j].items.length ; n++){
							cost += muni[j].items[n].cost;
						}
					}
					return cost;
				}

				let str_items_footer = "";

				$('#tbl_cost_dswd_summary tfoot').empty()

				for(k = 0 ; k < item_arr.length ; k++){
					str_items_footer += "<th style='text-align:center; border:1px solid #000; color: #000;' class='report_summary_td'>"+addComma(items_td_qty_footer(item_arr[k],muni_arr))+"</th>"+
					"<th style='text-align:right; border:1px solid #000; color: #000; padding-right: 3px' class='report_summary_td'>"+addCommaMoney(items_td_cost_footer(item_arr[k],muni_arr))+"</th>";
				}

				str_items_footer += "<th style='text-align:right; border:1px solid #000; color: #000; padding-right: 3px' class='report_summary_td'>"+addCommaMoney(items_td_total_cost_footer(muni_arr))+"</th>";

				$('#tbl_cost_dswd_summary tfoot').append(
					"<tr>"+
						"<th style='text-align: right; border:1px solid #000; color: #000; padding: 3px' class='report_summary_td'>TOTAL</th>"+
						str_items_footer+
					"</tr>"
				);

			})



			$('#tbl_damages_per_brgy tbody').empty();

			$.getJSON("/Pages/get_damage_per_brgy",datas,function(a){

				for(var i in provinces){	

					var totally_damaged 	= 0;
					var partially_damaged 	= 0;
					var dead 				= 0;
					var injured 			= 0;
					var missing 			= 0;
					var costasst_brgy 		= 0;
					var tot_aff_fam 		= 0;
					var tot_aff_person		= 0;

					for(var p in a){
						if(provinces[i].id == a[p].provinceid){
							totally_damaged 	= totally_damaged + Number(a[p].totally_damaged);
							partially_damaged 	= partially_damaged + Number(a[p].partially_damaged);
							dead 				= dead + Number(a[p].dead);
							injured 			= injured + Number(a[p].injured);
							missing 			= missing + Number(a[p].missing);

							tot_aff_fam 		= tot_aff_fam + Number(a[p].tot_aff_fam);
							tot_aff_person 		= tot_aff_person + Number(a[p].tot_aff_person);
							costasst_brgy 		= Number(costasst_brgy) + Number(a[p].costasst_brgy);
						}
					}

					$('#tbl_damages_per_brgy tbody').append(
						"<tr>"+
							"<th style='border:1px solid #000; cursor:pointer; padding: 3px; background-color:#169F85; color:#fff'>"+provinces[i].name+"</th>"+
							"<th style='border:1px solid #000; cursor:pointer; padding: 3px; background-color:#169F85; color:#fff; text-align:right'>"+addCommaMoney(costasst_brgy)+"</th>"+
							"<th style='background-color: #169F85; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(tot_aff_fam)+"</th>"+
							"<th style='background-color: #169F85; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(tot_aff_person)+"</th>"+
							"<th style='background-color: #169F85; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(totally_damaged)+"</th>"+
							"<th style='background-color: #169F85; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(partially_damaged)+"</th>"+
							
						"</tr>"
					)

					for(var j in a){

						var totally_damaged 	= 0;
						var partially_damaged 	= 0;
						var dead 				= 0;
						var injured 			= 0;
						var missing 			= 0;
						var costasst_brgy 		= 0;
						var tot_aff_fam 		= 0;
						var tot_aff_person		= 0;

						if(a[j].provinceid == provinces[i].id){
							if(j == 0){
								for(var k in a){
									if(a[j].municipality_id == a[k].municipality_id){
										totally_damaged 	= Number(totally_damaged) + Number(a[k].totally_damaged);
										partially_damaged 	= Number(partially_damaged) + Number(a[k].partially_damaged);
										dead 				= Number(dead) + Number(a[k].dead);
										injured 			= Number(injured) + Number(a[k].injured);
										missing 			= Number(missing) + Number(a[k].missing);

										tot_aff_fam 		= tot_aff_fam + Number(a[k].tot_aff_fam);
										tot_aff_person 		= tot_aff_person + Number(a[k].tot_aff_person);
										costasst_brgy 		= Number(costasst_brgy) + Number(a[k].costasst_brgy);
									}
								}
								$('#tbl_damages_per_brgy tbody').append(
									"<tr>"+
										"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000'>     "+a[j].municipality_name+"</th>"+
										"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addCommaMoney(costasst_brgy)+"</th>"+
										"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(tot_aff_fam)+"</th>"+
										"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(tot_aff_person)+"</th>"+
										"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(totally_damaged)+"</th>"+
										"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(partially_damaged)+"</th>"+
										
									"</tr>"
								)
								$('#tbl_damages_per_brgy tbody').append(
									"<tr ondblclick='updatedeldamageperbrgy("+a[j].id+")'>"+
										"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000'>         "+a[j].brgy_name+"</th>"+
										"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addCommaMoney(a[j].costasst_brgy)+"</th>"+
										"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_fam)+"</th>"+
										"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_person)+"</th>"+
										"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].totally_damaged)+"</th>"+
										"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].partially_damaged)+"</th>"+
										
									"</tr>"
								)
							}else{
								if(a[j].municipality_id == a[j-1].municipality_id){
									$('#tbl_damages_per_brgy tbody').append(
										"<tr ondblclick='updatedeldamageperbrgy("+a[j].id+")'>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000'>         "+a[j].brgy_name+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addCommaMoney(a[j].costasst_brgy)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_fam)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_person)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].totally_damaged)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].partially_damaged)+"</th>"+
											
										"</tr>"
									)
								}else{
									for(var k in a){
										if(a[j].municipality_id == a[k].municipality_id){
											totally_damaged 	= Number(totally_damaged) + Number(a[k].totally_damaged);
											partially_damaged 	= Number(partially_damaged) + Number(a[k].partially_damaged);
											dead 				= Number(dead) + Number(a[k].dead);
											injured 			= Number(injured) + Number(a[k].injured);
											missing 			= Number(missing) + Number(a[k].missing);

											tot_aff_fam 		= tot_aff_fam + Number(a[k].tot_aff_fam);
											tot_aff_person 		= tot_aff_person + Number(a[k].tot_aff_person);
											costasst_brgy 		= Number(costasst_brgy) + Number(a[k].costasst_brgy);
										}
									}
									$('#tbl_damages_per_brgy tbody').append(
										"<tr>"+
											"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000'>     "+a[j].municipality_name+"</th>"+
											"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addCommaMoney(costasst_brgy)+"</th>"+
											"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(tot_aff_fam)+"</th>"+
											"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(tot_aff_person)+"</th>"+
											"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(totally_damaged)+"</th>"+
											"<th style='background-color: #E9C341; border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(partially_damaged)+"</th>"+
										"</tr>"
									)
									$('#tbl_damages_per_brgy tbody').append(
										"<tr ondblclick='updatedeldamageperbrgy("+a[j].id+")'>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000'>         "+a[j].brgy_name+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addCommaMoney(a[j].costasst_brgy)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_fam)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_person)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].totally_damaged)+"</th>"+
											"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].partially_damaged)+"</th>"+
											
										"</tr>"
									)
									if(a[j].municipality_id == a[j-1].municipality_id){
										$('#tbl_damages_per_brgy tbody').append(
											"<tr ondblclick='updatedeldamageperbrgy("+a[j].id+")'>"+
												"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000'>         "+a[j].brgy_name+"</th>"+
												"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addCommaMoney(a[j].costasst_brgy)+"</th>"+
												"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_fam)+"</th>"+
												"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].tot_aff_person)+"</th>"+
												"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].totally_damaged)+"</th>"+
												"<th style='border:1px solid #000; cursor:pointer; padding: 3px; color:#000; text-align:right'>"+addComma(a[j].partially_damaged)+"</th>"+
												
											"</tr>"
										)
									}
								}
							}
						}
					}
				}

			});

			setTimeout(function(){

				$('#loader').hide();
				
		// End Master Query ===================================================================================================================================================
			},2000);



		}


	});

	
} 

function updateOutsideEvacuation(id){

	if($('#can_edit').text() == 'f'){

		msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

	}else{

		$('#saveFamOEC').hide();
		$('#upFamOEC').show();
		$('#delFamOEC').show();

		$('#addfamOEC').modal('show');

		upfamOECid = [];
		upfamOECid.push(id);

		var datas = {
			id : id
		};

		$.getJSON("/Pages/getFamOEC",datas,function(a){

			$('#addfamOECprov').val(a.rs[0].provinceid);
			$('#addfamOECprovO').val(a.rs[0].province_origin);

			$('#addfamOECcity').empty().append(
				"<option value=''>-- Select City/Municipality --</option>"
			);

			for(var j in a.city){
				$('#addfamOECcity').append(
					"<option value='"+a.city[j].id+"'>"+a.city[j].municipality_name+"</option>"
				);
			}

			$('#addfamOECcityO').empty().append(
				"<option value=''>-- Select City/Municipality --</option>"
			);

			for(var j in a.city2){
				$('#addfamOECcityO').append(
					"<option value='"+a.city[j].id+"'>"+a.city2[j].municipality_name+"</option>"
				);
			}

			$('#addfamOECcity').val(a.rs[0].municipality_id);
			$('#addfamOECcityO').val(a.rs[0].municipality_origin);

			$('#addfamOECbrgy').empty().append(
				"<option value=''>-- Select Barangay --</option>"
			);

			for(var j in a.brgy){
				$('#addfamOECbrgy').append(
					"<option value='"+a.brgy[j].id+"'>"+a.brgy[j].brgy_name+"</option>"
				);
			}

			$('#addfamOECbrgy').append(
				"<option value='0'>NOT INDICATED</option>"
			);

			$('#addfamOECbrgy').val(a.rs[0].brgy_host);

			$('#addfamOECbrgyO').empty().append(
				"<option value=''>-- Select Barafngay --</option>"
			);

			if(Number(a.rs[0].municipality_origin) > 73){

				$('#addfamOECbrgyO').append(
					"<option value='OTHERS'>OTHERS</option>"
				);

				$('#addfamOECbrgyO').val("OTHERS");

				$('#addfamOECbrgyOothers').prop("disabled",false);

				$('#addfamOECbrgyOothers').val(a.rs[0].brgy_origin);

			}else{

				for(var j in a.brgy2){
					$('#addfamOECbrgyO').append(
						"<option value='"+a.brgy[j].id+"'>"+a.brgy2[j].brgy_name+"</option>"
					);
				}

				$('#addfamOECbrgyO').append(
					"<option value='OTHERS'>OTHERS</option>"
				);

				if($.isNumeric(a.rs[0].brgy_origin) == true){
					$('#addfamOECbrgyO').val(a.rs[0].brgy_origin);
					$('#addfamOECbrgyOothers').val('');
					$('#addfamOECbrgyOothers').prop("disabled",true);
				}else{
					$('#addfamOECbrgyO').val("OTHERS");

					$('#addfamOECbrgyOothers').val(a.rs[0].brgy_origin);
					$('#addfamOECbrgyOothers').prop("disabled",false);

				}

			}

			$('#famcumO').val(a.rs[0].family_cum);
			$('#famnowO').val(a.rs[0].family_now);
			$('#personcumO').val(a.rs[0].person_cum);
			$('#personnowO').val(a.rs[0].person_now);

		});
	}


}

$('#viewcharts').click(function(){

	$('#loader').show();

	setTimeout(function(){
		$('#loader').hide();
		columnchart(chart_affprov,chart_affprovdrill,'dromic_chart','Graph of Affected Families Per Province','','Total Affected Families');
		columnchart(chart_affmunisall,null,'dromic_chart_2','Graph of Affected Families Per Municipality','','Total Affected Families');
	},1000)
	
})

function updateAssistanceList(id){
		
	var datas = {
		id : id
	}
	// $.getJSON("/Pages/get_spec_assistance",datas,function(a){

	// 	$('#families_served').val(a['rs'][0]['family_served']);
	// 	$('#single_cal3').val(todate3(a['rs'][0]['date_augmented']));

	// });

	if($('#can_edit').text() == 'f'){
		msgbox("You're not allowed to edit this entry. Kindly contact the administrator for this privilege.");
	}else{

		$.confirm({
		    title: '<span class="red">Confirm Action!</span>',
		    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Yes',
		    		btnClass: 'btn-red',
		    		action: function(){

		    			$.getJSON("/Pages/del_spec_assistance",datas,function(a){
		    				if(a == 1){
		    					get_dromic(URLID());
		    				}
						});

		            }
		    	},
		    	cancelAction: {
		    		text: '<i class="fa fa-times-circle"></i> No',
		    		btnClass: 'btn-blue'
		    	}
		    }
		});

	}

}

var damage_per_brgy_id = 0;

function updatedeldamageperbrgy(id){

	var datas = {
		id : id
	}

	if($('#can_edit').text() == 'f'){
		msgbox("You're not allowed to edit this entry. Kindly contact the administrator for this privilege.");
		$('#savedata_dam_per_brgy').hide();
		$('#saveBrgytoArray').hide();
		$('#updatedata_dam_per_brgyv2').hide();
		$('#deldata_dam_per_brgyv2').hide();
	}else{

		$('#editDamageModal').modal({backdrop: 'static', keyboard: false}, 'show');

		$('#savedata_dam_per_brgy').show();
		$('#saveBrgytoArray').show();
		$('#updatedata_dam_per_brgyv2').show();
		$('#deldata_dam_per_brgyv2').show();

		damage_per_brgy_id = id;
		$.getJSON("/Pages/get_damage_per_brgy_details",datas,function(a){
				for(var i in a['details']){

					$('#details_province').text(a['details'][i].province_name)
					$('#details_muni').text(a['details'][i].municipality_name)
					$('#details_brgy').text(a['details'][i].brgy_name)

					$('#province_dam_per_brgy').val(a['details'][i].provinceid);
					$('#damperbrgy_totally').val(a['details'][i].totally_damaged);
					$('#damperbrgy_partially').val(a['details'][i].partially_damaged);

					$('#damperbrgy_tot_aff_fam').val(a['details'][i].tot_aff_fam);
					$('#damperbrgy_tot_aff_person').val(a['details'][i].tot_aff_person);

					$('#damperbrgy_totallyv2').val(a['details'][i].totally_damaged);
					$('#damperbrgy_partiallyv2').val(a['details'][i].partially_damaged);

					$('#damperbrgy_tot_aff_famv2').val(a['details'][i].tot_aff_fam);
					$('#damperbrgy_tot_aff_personv2').val(a['details'][i].tot_aff_person);

					$('#costasst_brgyv2').val(a['details'][i].costasst_brgy)
					$('#costasst_brgy').val(a['details'][i].costasst_brgy)
				}

				$('#city_dam_per_brgy').empty().append(
					"<option value=''>-- Select City/Municipality --</option>"
				);

				for(var k in a['municipality']){
					$('#city_dam_per_brgy').append(
						"<option value='"+a['municipality'][k].id+"'>"+a['municipality'][k].municipality_name+"</option>"
					);
				}

				$('#city_dam_per_brgy').val(a['details'][i].municipality_id);

				$('#brgy_dam_per_brgy').empty().append(
					"<option value=''>-- Select Barangay -</option>"
				);

				for(var k in a['barangay']){
					$('#brgy_dam_per_brgy').append(
						"<option value='"+a['barangay'][k].id+"'>"+a['barangay'][k].brgy_name+"</option>"
					);
				}
				$('#brgy_dam_per_brgy').val(a['details'][i].brgy_id);
			});
		}

		$('#updatedata_dam_per_brgy').hide();
		$('#deldata_dam_per_brgy').hide();
}

$('#toexcel7').click(function(){

	if($('#can_edit').text() == 'f'){
		$('#savedata_dam_per_brgy').hide();
		$('#saveBrgytoArray').hide();
		$('#updatedata_dam_per_brgyv2').hide();
		$('#deldata_dam_per_brgyv2').hide();
	}else{
		$('#savedata_dam_per_brgy').show();
		$('#saveBrgytoArray').show();
		$('#updatedata_dam_per_brgyv2').show();
		$('#deldata_dam_per_brgyv2').show();
	}

	$('#updatedata_dam_per_brgy').hide();
	$('#deldata_dam_per_brgy').hide();

})

$('#updatedata_dam_per_brgyv2').click(function(){

	if(damage_per_brgy_id == 0){
		$.confirm({
		    title: 'Error!',
		    content: 'No available data to update!',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{

		var datas = {

			totally_damaged 	: $('#damperbrgy_totallyv2').val(),
			partially_damaged 	: $('#damperbrgy_partiallyv2').val(),

			tot_aff_fam 		: $('#damperbrgy_tot_aff_famv2').val(),
			tot_aff_person 		: $('#damperbrgy_tot_aff_personv2').val(),

			costasst_brgy 		: $('#costasst_brgyv2').val(),

			dead 				: 0,
			injured 			: 0, 
			missing 			: 0,

			municipality_id 	: $('#city_dam_per_brgy').val(),
			
			disaster_title_id 	: URLID(),
			id 					: damage_per_brgy_id
		};

		$.getJSON("/Pages/updatedamageperbrgy",datas,function(a){
			if(a == 1){

				$('#editDamageModal').modal('hide');

				get_dromic(URLID());

				$('#savedata_dam_per_brgy').show();
				$('#updatedata_dam_per_brgy').hide();
				$('#deldata_dam_per_brgy').hide();

				$('#province_dam_per_brgy').val('');

				$('#damperbrgy_totally').val('');
				$('#damperbrgy_partially').val('');

				$('#damperbrgy_tot_aff_fam').val('');
				$('#damperbrgy_tot_aff_person').val('');

				$('#damperbrgy_totallyv2').val('');
				$('#damperbrgy_partiallyv2').val('');
				$('#damperbrgy_tot_aff_famv2').val('');
				$('#damperbrgy_tot_aff_personv2').val('');
				$('#costasst_brgyv2').val('');

				$('#city_dam_per_brgy').val('');
				$('#brgy_dam_per_brgy').val('');
				$('#costasst_brgy').val('');

				damage_per_brgy_id = 0;
			}  
		});
	}

})

$('#deldata_dam_per_brgyv2').click(function(){

	var datas = {
		id 					: damage_per_brgy_id,
		municipality_id 	: $('#city_dam_per_brgy').val(),
		disaster_title_id 	: URLID(),
	}

	var uriID = URLID();

	if(damage_per_brgy_id == 0){
		$.confirm({
		    title: 'Error!',
		    content: 'No available data to delete!',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		$.confirm({
		    title: '<span class="red">Confirm Action!</span>',
		    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Yes',
		    		btnClass: 'btn-red',
		    		action: function(){
		    			$.getJSON("/Pages/deletedamageperbrgy",datas,function(a){
							if(a == 1){

								$('#editDamageModal').modal('hide');

								get_dromic(uriID);

								$('#savedata_dam_per_brgy').show();
								$('#updatedata_dam_per_brgy').hide();
								$('#deldata_dam_per_brgy').hide();

								$('#province_dam_per_brgy').val('');

								$('#damperbrgy_totally').val('');
								$('#damperbrgy_partially').val('');

								$('#damperbrgy_tot_aff_fam').val('');
								$('#damperbrgy_tot_aff_person').val('');

								$('#city_dam_per_brgy').val('');
								$('#brgy_dam_per_brgy').val('');

								$('#costasst_brgy').val('');

								damage_per_brgy_id = 0;
							}  
						});
		            }
		    	},
		    	cancelAction: {
		    		text: '<i class="fa fa-times-circle"></i> No',
		    		btnClass: 'btn-blue'
		    	}
		    }
		});
	}

})	


$('#updatedata_dam_per_brgy').click(function(){

	if(damage_per_brgy_id == 0){
		$.confirm({
		    title: 'Error!',
		    content: 'No available data to update!',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{

		var datas = {
			totally_damaged 	: $('#damperbrgy_totally').val(),
			partially_damaged 	: $('#damperbrgy_partially').val(),

			tot_aff_fam 		: $('#damperbrgy_tot_aff_fam').val(),
			tot_aff_person 		: $('#damperbrgy_tot_aff_person').val(),

			dead 				: $('#damperbrgy_dead').val(),
			injured 			: $('#damperbrgy_injured').val(), 
			missing 			: $('#damperbrgy_missing').val(),
			municipality_id 	: $('#city_dam_per_brgy').val(),
			costasst_brgy 		: $('#costasst_brgy').val(),
			disaster_title_id 	: URLID(),
			id 					: damage_per_brgy_id
		};

		$.getJSON("/Pages/updatedamageperbrgy",datas,function(a){
			if(a == 1){

				get_dromic(URLID());

				$('#savedata_dam_per_brgy').show();
				$('#updatedata_dam_per_brgy').hide();
				$('#deldata_dam_per_brgy').hide();

				$('#province_dam_per_brgy').val('');
				$('#damperbrgy_totally').val('');
				$('#damperbrgy_partially').val('');

				$('#damperbrgy_tot_aff_fam').val('');
				$('#damperbrgy_tot_aff_person').val('');

				$('#damperbrgy_dead').val('');
				$('#damperbrgy_injured').val('');
				$('#damperbrgy_missing').val('');

				$('#city_dam_per_brgy').val('');
				$('#brgy_dam_per_brgy').val('');
				$('#costasst_brgy').val('');

				damage_per_brgy_id = 0;
			}  
		});
	}

})

$('#deldata_dam_per_brgy').click(function(){

	var datas = {
		id 					: damage_per_brgy_id,
		municipality_id 	: $('#city_dam_per_brgy').val(),
		disaster_title_id 	: URLID(),
	}

	var uriID = URLID();

	if(damage_per_brgy_id == 0){
		$.confirm({
		    title: 'Error!',
		    content: 'No available data to delete!',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		$.confirm({
		    title: '<span class="red">Confirm Action!</span>',
		    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Yes',
		    		btnClass: 'btn-red',
		    		action: function(){
		    			$.getJSON("/Pages/deletedamageperbrgy",datas,function(a){
							if(a == 1){

								get_dromic(uriID);

								$('#savedata_dam_per_brgy').show();
								$('#updatedata_dam_per_brgy').hide();
								$('#deldata_dam_per_brgy').hide();

								$('#province_dam_per_brgy').val('');

								$('#damperbrgy_totally').val('');
								$('#damperbrgy_partially').val('');

								$('#damperbrgy_tot_aff_fam').val('');
								$('#damperbrgy_tot_aff_person').val('');

								$('#damperbrgy_dead').val('');
								$('#damperbrgy_injured').val('');
								$('#damperbrgy_missing').val('');

								$('#city_dam_per_brgy').val('');
								$('#brgy_dam_per_brgy').val('');

								damage_per_brgy_id = 0;
							}  
						});
		            }
		    	},
		    	cancelAction: {
		    		text: '<i class="fa fa-times-circle"></i> No',
		    		btnClass: 'btn-blue'
		    	}
		    }
		});
	}

})


function todate(item){
	item = $.datepicker.formatDate('MM dd, yy', new Date(item));
	return item
}

function todate2(item){
	item = $.datepicker.formatDate('yy/mm/dd', new Date(item));
	return item
}

function todate3(item){
	item = $.datepicker.formatDate('mm/dd/yy', new Date(item));
	return item
}

function todatesave(item,time){
	item = $.datepicker.formatDate("mm dd yy", new Date(item));
	time = time.split(":");
	return item+" "+time[0]+" "+time[1];
}

function isnullperd(item){
	if(item == null || item == 0){
		return "";
	}else{
		return addComma(item);
	}
}

function isnulls(item){
	if(item == null || item == 0){
		return "0";
	}else{
		return item;
	}
}

function isnull(item){
	if(item == null || item == 0){
		return "-";
	}else{
		return item;
	}
}

function isnulldo(item){
	if(item == null || item == 0){
		return "-";
	}else{
		return item;
	}
}

function isnulld(item){
	if(item == 't'){
		return "X";
	}else{
		return "-";
	}
}

function addComma(item){
	if(isnull(item) == '-'){
		return '-';
	}else{
		item = Number(item);
		return item.toLocaleString();
	}
}

function addCommaMoney(item){
	if(isnull(item) == '-'){
		return '-';
	}else{
		string = item.toString().split(".");
		leftpos = string[0];
		dotpos = string[1];
		leftpos = Number(leftpos);

		if(dotpos == null){
			return leftpos.toLocaleString() + "." + "00";
		}else{
			if(dotpos.length < 1){
				return leftpos.toLocaleString() + "." + dotpos + "00";
			}else if(dotpos.length <= 1){
            	return leftpos.toLocaleString() + "." + dotpos + "0";
            }else if(dotpos.length > 2){
				var num = "." + dotpos.toString();
				num = Number(num);
				var nnum = Math.round(num*100)/100;
				var nstring = nnum.toString();
				nstring = nstring.split(".");
				var nstring1 = nstring[1];

				if(nstring1 == null){
					return leftpos.toLocaleString() + "." + "00";
				}else{
					if(nstring1.length < 2){
						return leftpos.toLocaleString() + "." + nstring[1] + "0";
					}else{
						return leftpos.toLocaleString() + "." + nstring[1];
					}
				}
				
			}else{
				var mm = leftpos + "." + dotpos;
				return Number(mm).toLocaleString();
			}
		}
	}
}

function viewLatestReport(i){

	var datas = {
		id : i
	};

	$.getJSON("/Pages/get_disasterdetail",datas,function(a){  

		var id = a.rstitle[0].id;
		viewDetailsPrev(id);

	});

}

function viewPrevious(i){

	$('#myModal').modal('show')

	var datas = {
		id : i
	};

	if(dtable){
		dtable.destroy();
	}

	$.getJSON("/Pages/get_disasterdetail",datas,function(a){  

		$('#disaster_name_modal').empty().append('Previous Reports ('+a.rs[0].disaster_name+ ' '+todate(a.rs[0].disaster_date)+')');
		$('#tbl_previous_reports tbody').empty();

		for(var i in a.rstitle){
			$('#tbl_previous_reports tbody').append(
				"<tr>"+
					"<td style='text-align:center'>"+(Number(i)+1)+"</td>"+
					"<td>"+a.rstitle[i].disaster_title+" as of " +todate(a.rstitle[i].ddate)+ " " +a.rstitle[i].asoftime+ "</td>"+
					"<td style='text-align:center'><button type='button' class='btn btn-success btn-xs' onclick='viewDetailsPrev("+a.rstitle[i].id+")'><i class='fa fa-eye'></i> View Details</button></td>"+
				"</tr>"
			)
		}

		dtable = $('#tbl_previous_reports').DataTable();

	});

}

function viewDetailsPrev(i){

	var isadmin = $('#hiddenisadmin').val();

	if(isadmin == 'reports'){
		$.confirm({
		    title: '',
		    content: '<i class="fa fa-exclamation-circle"></i> You don\'t have access to view this page. Kindly contact administrator to change user privileges.',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-times-circle-o"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
			var win = window.open("dromic_master_excel/?XCqdPsmLaQwAyt="+i,'Report Details');
	}
}

function getURL(){

	var t = window.location.href;
	t = t.split("=");
	var st = t[1];
	st = st.replace(/\D/g,'');

	get_dromic(st);

}
  
function addnewReport(i){

	$('#addnewReport').modal('show');

	$.getJSON("/Pages/get_teamleader",function(a){ 
		if(a != 0){
			for(var i in a){
				if(a[i].qrt_position_id == 2){
					$('#preparedby').val(a[i].fullname.toUpperCase());
					$('#preparedbypos').val('Statistician');
				}
				if(a[i].qrt_position_id == 1){
					$('#recommendedby').val(a[i].fullname.toUpperCase());
					$('#recommendedbypos').val('Team Leader');
				}
			}
		}
	});

	for(var o in newreptitle){
		if(newreptitle[o].id == i){
			$('#newreporttitle').val(newreptitle[o].title);
			break;
		}
	}

	newi = i;
	getDate();

}      

function getDate(){

	var d = new Date();

	var h = "";
    var m = "";
    var s = "";

    if(d.getHours() < 10){
    	h = "0"+d.getHours();
    }else{
    	if(d.getHours() > 12){
    		h = "0" + (Number(d.getHours() - 12));
    	}else{
    		h = d.getHours();
    	}
	}

    if(d.getMinutes() < 10){
    	m = "0"+d.getMinutes();
    }else{
    	m = d.getMinutes();
    }

    if(d.getSeconds() < 10){
    	s = "0"+d.getSeconds();
    }else{
    	s = d.getSeconds();
    }

    if(d.getHours() >= 12){
    	time = h+":"+m+" PM";
    }else{
    	time = h+":"+m+" AM";
    }

    var year = d.getFullYear();
    var month = d.getMonth();
    month += 1;
    var day = d.getDate();

    if(month < 10){
    	month = "0" + month;
    }

    if(day < 10){
    	day = "0" + day;
    }

    $('#newreportdate').val(year+"-"+month+"-"+day);

    $('#newreporttime').val(time);

}
$('#errmsgnewdromic').hide();
function savenewDromic(){

	var datas = {
		id 					: newi,
		newreporttitle 		: $('#newreporttitle').val(),
		newreportdate 		: $('#newreportdate').val(),
		newreporttime 		: $('#newreporttime').val(),
		preparedby 			: $('#preparedby').val(),
		recommendedby 		: $('#recommendedby').val(),
		approvedby 			: $('#approvedby').val(),
		preparedbypos 		: $('#preparedbypos').val(),
		recommendedbypos 	: $('#recommendedbypos').val(),
		approvedbypos 		: $('#approvedbypos').val()
	}

	if(datas.newreporttitle == "" || datas.newreportdate == "" || datas.newreporttime == "" || datas.preparedby == "" || datas.recommendedby == "" || datas.approvedby == "" || datas.preparedbypos == "" || datas.recommendedbypos == "" || datas.approvedbypos == ""){

		$('#errmsgnewdromic').show();
		$('#errmsgnewdromic').empty().append("<span class='fa fa-info-circle'></span> Kindly fill all fields to continue!");
		setTimeout(function(){
			$('#errmsgnewdromic').fadeOut();
		},1500);

	}else{
		$.getJSON("/Pages/savenewtitle",datas,function(a){
			viewDetailsPrev(a);
		})
	}
}

$('#addfamiec').click(function(){

	ec_update_save = 1;

	$('#addfaminsideEC').modal("show");

	$('#headertitle').empty().append("Add");
	$('#updateECS').hide();	
	$('#addfaminsideECprov').val('');
	$('#addfaminsideECcity').val('');
	$('#ecicum').val('');
	$('#ecinow').val('');
	$('#ecname').val('');
	$('#ecfamcum').val('');
	$('#ecfamnow').val('');
	$('#ecpercum').val('');
	$('#ecpernow').val('');
	$('#ecplaceorigin').val('');
	$('#ecplaceorigin1').val('');
	$('#ecistatus').val('');

	$('#addfaminsideECcity').empty().append("-- Select City/Municipality --");
	$('#brgylocated_ec').empty();
	$('#ecplaceorigin').empty();

	$('#ecplaceorigin').select2({
	        placeholder: "Select Barangay",
	        allowClear: true
	 }); 
	$('#brgylocated_ec').select2({
	        placeholder: "Select Barangay",
	        allowClear: true
	 }); 

	$('#addfaminsideECprov').prop("disabled",!1);
	$('#addfaminsideECcity').prop("disabled",!1);
	//$('#ecplaceorigin').prop("disabled",1);
	$('#ecname').prop("disabled",!1);

	$('#addECS').show();
	$('#addMECS').show();

	$('#addAECS').show();
	$('#addCECS').show();

	$('#deleteECS').hide();
	$('#clearECS').hide();

})

function addFamIEC(){

	var uriID = URLID();

	var origin = "";

	for(var i = 0 ; i < $('#ecplaceorigin :selected').length ; i++){

		if(i == 0){
			origin = $('#ecplaceorigin :selected')[i].value;
		}else{
			origin =  origin + "," + $('#ecplaceorigin :selected')[i].value;
		}

	}

	var datas = {
		disasterID 			: uriID,
		eciprov 			: $('#addfaminsideECprov').val(),
		ecicity 			: $('#addfaminsideECcity').val(),
		ecicum 				: $('#ecicum').val(),
		ecinow 				: $('#ecinow').val(),
		eciname 			: $('#ecname').val(),
		ecifamcum 			: $('#ecfamcum').val(),
		ecifamnow 			: $('#ecfamnow').val(),
		ecipercum 			: $('#ecpercum').val(),
		ecipernow 			: $('#ecpernow').val(),
		brgy_located_ec 	: $('#brgylocated_ec').val(),
		brgy_located 		: origin,
		eciplaceorigin 		: "",
		ecstatus 			: $('#ecistatus').val(),
		ec_remarks 			: $('#ec_remarks').val()
	};

	if(datas.eciprov == "" || datas.ecicity == "" || datas.eciname == "" || datas.ecifamcum == "" || datas.ecifamnow == "" || datas.ecipernow == "" || datas.ecipercum == "" || datas.brgylocated_ec == "" || datas.brgy_located == ""){

		msgbox("Kindly fill [Province, Municipality, Barangay Located EC, EC Name, Family CUM , Family Now, Person CUM, Person Now, Barangay Located Evacuees]")

	}else{

		if(Number($('#ecfamcum').val()) < Number($('#ecfamnow').val())){
			msgbox("Family NOW must not be greater than Family CUM");
		}else{
			if(Number($('#ecpercum').val()) < Number($('#ecpernow').val())){
				msgbox("Person NOW must not be greater than Person CUM");
			}else{

				if(datas.ecicum != ""){
					if($('#ecistatus').val() == ""){
						msgbox("Kindly indicate Evacuation Center Status to continue!");
					}else{

						$.getJSON("/Pages/savenewEC",datas,function(a){

							alerts();
							get_dromic(uriID);

							$('#addfaminsideECprov').val('');
							$('#addfaminsideECcity').val('');
							$('#ecicum').val('');
							$('#ecinow').val('');
							$('#ecname').val('');
							$('#ecfamcum').val('');
							$('#ecfamnow').val('');
							$('#ecpercum').val('');
							$('#ecpernow').val('');
							$('#ecplaceorigin').val('');
							$('#brgylocated_ec').val('');
							$('#ecistatus').val('');
							$('#ec_remarks').val('')

							$('#addfaminsideEC').modal('hide');

							// issuesfound();

						});
					}

				}else{

					$.getJSON("/Pages/savenewEC",datas,function(a){

						alerts();
						get_dromic(uriID);

						$('#addfaminsideECprov').val('');
						$('#addfaminsideECcity').val('');
						$('#ecicum').val('');
						$('#ecinow').val('');
						$('#ecname').val('');
						$('#ecfamcum').val('');
						$('#ecfamnow').val('');
						$('#ecpercum').val('');
						$('#ecpernow').val('');
						$('#ecplaceorigin').val('');
						$('#brgylocated_ec').val('');
						$('#ecistatus').val('');
						$('#ec_remarks').val('')

						$('#addfaminsideEC').modal('hide');

						// issuesfound();

					});

				}
			}
		}
	}

}

function addFamIECS(){

	var uriID = URLID();

	var origin = "";

	for(var i = 0 ; i < $('#ecplaceorigin :selected').length ; i++){

		if(i == 0){
			origin = $('#ecplaceorigin :selected')[i].value;
		}else{
			origin =  origin + "," + $('#ecplaceorigin :selected')[i].value;
		}

	}

	var datas = {
		disasterID 			: uriID,
		eciprov 			: $('#addfaminsideECprov').val(),
		ecicity 			: $('#addfaminsideECcity').val(),
		ecicum 				: $('#ecicum').val(),
		ecinow 				: $('#ecinow').val(),
		eciname 			: $('#ecname').val(),
		ecifamcum 			: $('#ecfamcum').val(),
		ecifamnow 			: $('#ecfamnow').val(),
		ecipercum 			: $('#ecpercum').val(),
		ecipernow 			: $('#ecpernow').val(),
		brgy_located_ec 	: $('#brgylocated_ec').val(),
		brgy_located 		: origin,
		eciplaceorigin 		: "",
		ecstatus 			: $('#ecistatus').val(),
		ec_remarks 			: $('#ec_remarks').val()
	};

	if(datas.eciprov == "" || datas.ecicity == "" || datas.eciname == "" || datas.ecifamcum == "" || datas.ecifamnow == "" || datas.ecipernow == "" || datas.ecipercum == "" || datas.brgylocated_ec == "" || datas.brgy_located == ""){

		msgbox("Kindly fill [Province, Municipality, Barangay Located EC, EC Name, Family CUM , Family Now, Person CUM, Person Now, Barangay Located Evacuees]")

	}else{

		if(Number($('#ecfamcum').val()) < Number($('#ecfamnow').val())){
			msgbox("Family NOW must not be greater than Family CUM");
		}else{
			if(Number($('#ecpercum').val()) < Number($('#ecpernow').val())){
				msgbox("Person NOW must not be greater than Person CUM");
			}else{

				if(datas.ecicum != ""){
					
					if($('#ecistatus').val() == ""){
						msgbox("Kindly indicate Evacuation Center Status to continue!");
					}else{

						$.getJSON("/Pages/savenewEC",datas,function(a){

							alerts();
							get_dromic(uriID);

							$('#ecicum').val('');
							$('#ecinow').val('');
							$('#ecname').val('');
							$('#ecfamcum').val('');
							$('#ecfamnow').val('');
							$('#ecpercum').val('');
							$('#ecpernow').val('');
							$('#ecplaceorigin').val('');
							$('#brgylocated_ec').val('');
							$('#ecistatus').val('');
							$('#ec_remarks').val('');

							$('#ecicum').prop("disabled",false);
							$('#ecinow').prop("disabled",false);
							//$('#ecistatus').prop("disabled",false);

							$('#ecplaceorigin').select2({
							        placeholder: "Select Barangay",
							        allowClear: true
							 }); 
							$('#brgylocated_ec').select2({
							        placeholder: "Select Barangay",
							        allowClear: true
							 });

							autocompleteEC();
							autocompleteOriginProvince();
							addfaminsideECcitys();
							// issuesfound();

						})
					}

				}else{

					$.getJSON("/Pages/savenewEC",datas,function(a){

						alerts();
						get_dromic(uriID);

						$('#ecicum').val('');
						$('#ecinow').val('');
						$('#ecname').val('');
						$('#ecfamcum').val('');
						$('#ecfamnow').val('');
						$('#ecpercum').val('');
						$('#ecpernow').val('');
						$('#ecplaceorigin').val('');
						$('#brgylocated_ec').val('');
						$('#ecistatus').val('');
						$('#ec_remarks').val('');

						$('#ecicum').prop("disabled",false);
						$('#ecinow').prop("disabled",false);
						//$('#ecistatus').prop("disabled",false);

						$('#ecplaceorigin').select2({
						        placeholder: "Select Barangay",
						        allowClear: true
						 }); 
						$('#brgylocated_ec').select2({
						        placeholder: "Select Barangay",
						        allowClear: true
						 });

						autocompleteEC();
						autocompleteOriginProvince();
						addfaminsideECcitys();
						// issuesfound();

					})

				}
			}
		}
	}

}

function addFamAECS(){

	var uriID = URLID();

	var origin = "";

	for(var i = 0 ; i < $('#ecplaceorigin :selected').length ; i++){

		if(i == 0){
			origin = $('#ecplaceorigin :selected')[i].value;
		}else{
			origin =  origin + "," + $('#ecplaceorigin :selected')[i].value;
		}

	}

	var datas = {
		disasterID 			: uriID,
		eciprov 			: $('#addfaminsideECprov').val(),
		ecicity 			: $('#addfaminsideECcity').val(),
		ecicum 				: $('#ecicum').val(),
		ecinow 				: $('#ecinow').val(),
		eciname 			: $('#ecname').val(),
		ecifamcum 			: $('#ecfamcum').val(),
		ecifamnow 			: $('#ecfamnow').val(),
		ecipercum 			: $('#ecpercum').val(),
		ecipernow 			: $('#ecpernow').val(),
		brgy_located_ec 	: $('#brgylocated_ec').val(),
		brgy_located 		: origin,
		eciplaceorigin 		: "",
		ecstatus 			: $('#ecistatus').val(),
		ec_remarks 			: $('#ec_remarks').val()
	};

	if(datas.eciprov == "" || datas.ecicity == "" || datas.eciname == "" || datas.ecifamcum == "" || datas.ecifamnow == "" || datas.ecipernow == "" || datas.ecipercum == "" || datas.brgylocated_ec == "" || datas.brgy_located == ""){

		msgbox("Kindly fill [Province, Municipality, Barangay Located EC, EC Name, Family CUM , Family Now, Person CUM, Person Now, Barangay Located Evacuees]")

	}else{

		if(Number($('#ecfamcum').val()) < Number($('#ecfamnow').val())){
			msgbox("Family NOW must not be greater than Family CUM");
		}else{
			if(Number($('#ecpercum').val()) < Number($('#ecpernow').val())){
				msgbox("Person NOW must not be greater than Person CUM");
			}else{

				if(datas.ecicum != ""){
					
					if($('#ecistatus').val() == ""){
						msgbox("Kindly indicate Evacuation Center Status to continue!");
					}else{

						$.getJSON("/Pages/savenewEC",datas,function(a){

							alerts();
							get_dromic(uriID);

							$('#ecicum').val('');
							$('#ecinow').val('');
							$('#ecname').val('');
							$('#ecfamcum').val('');
							$('#ecfamnow').val('');
							$('#ecpercum').val('');
							$('#ecpernow').val('');
							$('#ecplaceorigin').val('');
							$('#brgylocated_ec').val('');
							$('#ecistatus').val('');
							$('#addfaminsideECcity').val('');
							$('#addfaminsideECprov').val('');
							$('#ec_remarks').val('');

							$('#ecicum').prop("disabled",false);
							$('#ecinow').prop("disabled",false);
							//$('#ecistatus').prop("disabled",false);

							$('#brgylocated_ec').empty();
							$('#ecplaceorigin').empty();

							$('#ecplaceorigin').select2({
							        placeholder: "Select Barangay",
							        allowClear: true
							 }); 
							$('#brgylocated_ec').select2({
							        placeholder: "Select Barangay",
							        allowClear: true
							 }); 



							// issuesfound();

						})
					}

				}else{

					$.getJSON("/Pages/savenewEC",datas,function(a){

						alerts();
						get_dromic(uriID);

						$('#ecicum').val('');
						$('#ecinow').val('');
						$('#ecname').val('');
						$('#ecfamcum').val('');
						$('#ecfamnow').val('');
						$('#ecpercum').val('');
						$('#ecpernow').val('');
						$('#ecplaceorigin').val('');
						$('#brgylocated_ec').val('');
						$('#ecistatus').val('');
						$('#addfaminsideECcity').val('');
						$('#addfaminsideECprov').val('');
						$('#ec_remarks').val('');

						$('#ecicum').prop("disabled",false);
						$('#ecinow').prop("disabled",false);
						//$('#ecistatus').prop("disabled",false);

						$('#brgylocated_ec').empty();
						$('#ecplaceorigin').empty();

						$('#ecplaceorigin').select2({
						        placeholder: "Select Barangay",
						        allowClear: true
						 }); 
						$('#brgylocated_ec').select2({
						        placeholder: "Select Barangay",
						        allowClear: true
						 }); 

						// issuesfound();

					})

				}
			}
		}
	}

}

function addFamCECS(){

	var uriID = URLID();

	var origin = "";

	for(var i = 0 ; i < $('#ecplaceorigin :selected').length ; i++){

		if(i == 0){
			origin = $('#ecplaceorigin :selected')[i].value;
		}else{
			origin =  origin + "," + $('#ecplaceorigin :selected')[i].value;
		}

	}

	var datas = {
		disasterID 			: uriID,
		eciprov 			: $('#addfaminsideECprov').val(),
		ecicity 			: $('#addfaminsideECcity').val(),
		ecicum 				: $('#ecicum').val(),
		ecinow 				: $('#ecinow').val(),
		eciname 			: $('#ecname').val(),
		ecifamcum 			: $('#ecfamcum').val(),
		ecifamnow 			: $('#ecfamnow').val(),
		ecipercum 			: $('#ecpercum').val(),
		ecipernow 			: $('#ecpernow').val(),
		brgy_located_ec 	: $('#brgylocated_ec').val(),
		brgy_located 		: origin,
		eciplaceorigin 		: "",
		ecstatus 			: $('#ecistatus').val(),
		ec_remarks 			: $('#ec_remarks').val()
	};

	if(datas.eciprov == "" || datas.ecicity == "" || datas.eciname == "" || datas.ecifamcum == "" || datas.ecifamnow == "" || datas.ecipernow == "" || datas.ecipercum == "" || datas.brgylocated_ec == "" || datas.brgy_located == ""){

		msgbox("Kindly fill [Province, Municipality, Barangay Located EC, EC Name, Family CUM , Family Now, Person CUM, Person Now, Barangay Located Evacuees]")

	}else{

		if(Number($('#ecfamcum').val()) < Number($('#ecfamnow').val())){
			msgbox("Family NOW must not be greater than Family CUM");
		}else{
			if(Number($('#ecpercum').val()) < Number($('#ecpernow').val())){
				msgbox("Person NOW must not be greater than Person CUM");
			}else{

				if(datas.ecicum != ""){
					
					if($('#ecistatus').val() == ""){
						msgbox("Kindly indicate Evacuation Center Status to continue!");
					}else{

						$.getJSON("/Pages/savenewEC",datas,function(a){

							alerts();
							get_dromic(uriID);

							$('#ecicum').val('');
							$('#ecinow').val('');
							$('#ecfamcum').val('');
							$('#ecfamnow').val('');
							$('#ecpercum').val('');
							$('#ecpernow').val('');
							$('#ecplaceorigin').val('');
							$('#ecistatus').val('');
							$('#ec_remarks').val('');

							$('#ecicum').prop("disabled",true);
							$('#ecinow').prop("disabled",true);
							//$('#ecistatus').prop("disabled",true);

							$('#ecplaceorigin').select2({
							        placeholder: "Select Barangay",
							        allowClear: true
							 }); 
							$('#brgylocated_ec').select2({
							        placeholder: "Select Barangay",
							        allowClear: true
							 });

							autocompleteEC();
							// issuesfound();

						})	
					}

				}else{

					$.getJSON("/Pages/savenewEC",datas,function(a){

						alerts();
						get_dromic(uriID);

						$('#ecicum').val('');
						$('#ecinow').val('');
						$('#ecfamcum').val('');
						$('#ecfamnow').val('');
						$('#ecpercum').val('');
						$('#ecpernow').val('');
						$('#ecplaceorigin').val('');
						$('#ecistatus').val('');
						$('#ec_remarks').val('');

						$('#ecicum').prop("disabled",true);
						$('#ecinow').prop("disabled",true);
						//$('#ecistatus').prop("disabled",true);

						$('#ecplaceorigin').select2({
						        placeholder: "Select Barangay",
						        allowClear: true
						 }); 
						$('#brgylocated_ec').select2({
						        placeholder: "Select Barangay",
						        allowClear: true
						 });

						autocompleteEC();
						// issuesfound();

					})

				}
			}
		}
	}

}

var dataEC = [];

function autocompleteEC(){

	var uriID = URLID();

	var cid = $('#addfaminsideECcity').val();

	var datas = {
		uriID 	: uriID,
		cid 	: cid	
	};

	var dataq = [];
	var datae = [];

	$.getJSON("/Pages/getAllEC",datas,function(a){

		for(var t in a['rs']){
			dataq.push(a.rs[t].evacuation_name.toUpperCase());
		}

		for(var t in a.re){
			datae.push(a.re[t].evacuation_name.toUpperCase());
		}

		for(var t in a['rs']){
			datae.push(a.rs[t].evacuation_name.toUpperCase());
		}

		datae.sort();

		for(var ec in datae){
			if(ec > 0){
				if(datae[ec] == datae[ec-1]){
					datae.splice(ec,1);
				}
			}
		}

		// $("#ecname").autocomplete({
		// 	source : datae
		// });

		$("#ecname").autoComplete({
			minChars	:  	1,
			source 		: function(term, suggest){
				term = term.toLowerCase();
				var choices = datae;
				var suggestions = [];

				var str = term.split(/[^A-Za-z]/);

				for(j = 0 ; j < str.length ; j++){
					if(str[j].length > 0){
						for(i = 0 ; i < choices.length ; i++){
							if ((choices[i]).toLowerCase().includes(str[j])){
								suggestions.push(choices[i]);
							}
						}
					}
				}

				function removeDups(names) {
				  let unique = {};
				  names.forEach(function(i) {
				    if(!unique[i]) {
				      unique[i] = true;
				    }
				  });
				  return Object.keys(unique);
				}

				suggest(removeDups(suggestions));
			}
		});

	});

	setTimeout(function(){
		dataEC = dataq
	},1500);

}

$(document).ready(function(){
	
	$('#ecplaceorigin').val('');
	$('#brgylocated_ec').val('');

	$('#ecplaceorigin').select2({
	        placeholder: "Select Barangay",
	        allowClear: true
	}); 
	$('#brgylocated_ec').select2({
	        placeholder: "Select Barangay",
	        allowClear: true
	}); 
})



function autocompleteOriginProvince(){

	var uriID = URLID();

	var pid = $('#addfaminsideECprov').val();

	var datas = {
		uriID 	: uriID,
		pid 	: pid	
	};

	$('#brgylocated_ec').empty();

	$('#ecplaceorigin').empty();


	$.getJSON("/Pages/getAllOriginProvince",datas,function(a){

		$('#brgylocated_ec').append(
			"<option value=''></option>"
		);

		for(var k in a.city){

			// $('#brgylocated_ec').append(
			// 	"<option value='' style='font-size:18px; color: red'>-- Select Barangay in "+a.city[k].municipality_name+" --</option>"
			// );

			// $('#ecplaceorigin').append(
			// 	"<option value='' style='font-size:18px; color: red'>-- Select Barangay in "+a.city[k].municipality_name+" --</option>"
			// );

			for(var t in a.rs){

				if(a.rs[t].municipality_id == a.city[k].id){
					
						$('#ecplaceorigin').append(
							"<option value='"+a.rs[t].id+"'>         "+a.rs[t].brgy_name+ ", " + a.city[k].municipality_name + "</option>"
						);

				}

				if(a.rs[t].municipality_id == a.city[k].id){
					
						$('#brgylocated_ec').append(
							"<option value='"+a.rs[t].id+"'>         "+a.rs[t].brgy_name+ ", " + a.city[k].municipality_name + "</option>"
						);

				}
				
			}

		}

		$('#ecplaceorigin').select2({
		        placeholder: "Select Barangay",
		        allowClear: true
		 }); 
		$('#brgylocated_ec').select2({
		        placeholder: "Select Barangay",
		        allowClear: true
		 }); 


	});

}

function autocompleteOrigin(){

	var uriID = URLID();

	var cid = $('#addfaminsideECcity').val();

	var datas = {
		uriID 	: uriID,
		cid 	: cid	
	};

	// $('#ecplaceorigin').empty().append(
	// 	"<option value=''>-- Select Barangay --</option>"
	// );

	$('#brgylocated_ec').empty().append(
		"<option value=''>-- Select Barangay --</option>"
	);

	$.getJSON("/Pages/getAllOrigin",datas,function(a){

		for(var t in a){

			if(a[t].municipality_id == $('#addfaminsideECcity').val()){
					
				$('#brgylocated_ec').append(
					"<option value='"+a[t].id+"'>         "+a[t].brgy_name+ ", " + a[t].municipality_name + "</option>"
				);

			}

		}

	});

}


$('#addfaminsideECcity').change(function(){

	autocompleteEC();
	autocompleteOrigin();

	// var aa = "-- Select Barangay in " + $('#addfaminsideECcity option:selected').text() + " --";


	// $("#brgylocated_ec > option").each(function() {
	// 	if(this.text == aa){
	// 		this.selected = true;
	// 	}
	// });

	// $("#ecplaceorigin > option").each(function() {
	// 	if(this.text == aa){
	// 		this.selected = true;
	// 	}
	// });

	// $('#ecplaceorigin').select2({
	//         placeholder: "Select Barangay",
	//         allowClear: true
	// }); 
	// $('#brgylocated_ec').select2({
	//         placeholder: "Select Barangay",
	//         allowClear: true
	// }); 


})


function addfaminsideECcitys(){

	autocompleteEC();
	//autocompleteOrigin();

	var aa = "-- Select Barangay in " + $('#addfaminsideECcity option:selected').text() + " --";


	$("#brgylocated_ec > option").each(function() {
		if(this.text == aa){
			this.selected = true;
		}
	});

	$("#ecplaceorigin > option").each(function() {
		if(this.text == aa){
			this.selected = true;
		}
	});


}

$("#ecname").blur(function(){


	if(dataEC.length < 1){

		console.log(1);

		$('#ecicum').prop("disabled",false);
		$('#ecinow').prop("disabled",false);
		$('#ecicum').val("1");
		$('#ecinow').val("1");

	}else{
		for(var o in dataEC){
			if($(this).val().toLowerCase() == dataEC[o].toLowerCase()){

				if(ec_update_save === 1){
					$('#ecicum').prop("disabled",true);
					$('#ecinow').prop("disabled",true);
					$('#ecistatus').prop("disabled",true);
					$('#ecicum').val('');
					$('#ecinow').val('');
					$('#ecistatus').val('');
					break;
				}

			}else{
				$('#ecicum').prop("disabled",false);
				$('#ecinow').prop("disabled",false);
				//$('#ecistatus').prop("disabled",false);
				if(ec_update_save !== 2){
					$('#ecicum').val(1);
					$('#ecinow').val(1);
				}
				
			}
		}
	}

	if($("#ecname").val() == ""){
		$('#ecicum').val('');
		$('#ecinow').val('');
		//$('#ecplaceorigin').prop("disabled",1);
		$('#ecplaceorigin1').prop("disabled",1);
	}else{
		//$('#ecplaceorigin').prop("disabled",!1);
		$('#ecplaceorigin1').prop("disabled",!1);
	}

})

var evac_id = 0;
var ecstatus = "";

function updateEC(i){

	if($('#can_edit').text() == 'f'){
		msgbox("You're not allowed to edit this entry. Kindly contact the administrator");
	}else{

		ec_update_save = 2;

		$('#loader').show();
		$('#headertitle').empty().append("Update");
		$('#updateECS').show();
		$('#addECS').hide();	
		$('#addMECS').hide();
		$('#deleteECS').show();

		$('#addAECS').hide();
		$('#addCECS').hide();

		$('#clearECS').show();


		var datas = {
			id : i
		}

		evac_id = i;

		$.getJSON("/Pages/getECDetail",datas,function(a){

			$('#addfaminsideECprov').val(a.rs[0].provinceid);

			var pid = $('#addfaminsideECprov').val();	

			$('#addfaminsideECcity').empty();
			$('#addfaminsideECcity').append(
			    "<option value=''>-- Select City/Municipality --</option>"
			);

		    for(var i in a.city){
	    		$('#addfaminsideECcity').append(
			        "<option value='"+a.city[i].id+"'>"+a.city[i].municipality_name+"</option>"
			    )
		    }

		    $('#addfaminsideECcity').val(a.rs[0].municipality_id);

		    autocompleteEC();
			//autocompleteOriginProvince();

			$('#brgylocated_ec').empty();

			$('#ecplaceorigin').empty();

			// $('#brgylocated_ec').append(
			// 	"<option value='' style='font-size:18px; color: red' disabled='disabled'>-- Select Barangay --</option>"
			// );

			// $('#ecplaceorigin').append(
			// 	"<option value='' style='font-size:18px; color: red' disabled='disabled'>-- Select Barangay --</option>"
			// );


			for(var k in a.city){

				for(var t in a.brgy){

					if(a.brgy[t].municipality_id == a.city[k].id){
						// console.log(1);

						
							$('#ecplaceorigin').append(
								"<option value='"+a.brgy[t].id+"'>         "+a.brgy[t].brgy_name+ ", " +a.city[k].municipality_name+ "</option>"
							);


							$('#brgylocated_ec').append(
								"<option value='"+a.brgy[t].id+"'>         "+a.brgy[t].brgy_name+ ", " +a.city[k].municipality_name+ "</option>"
							);

					}
					
				}

			}

			var bb = a.rs[0].brgy_located.toString();
			bb = bb.split(",");

			bb = bb.sort();


	    	$('#ecplaceorigin').val(bb.sort());
	    	$('#brgylocated_ec').val(a.rs[0].brgy_located_ec);

	    	$('#ecplaceorigin').select2({
			        placeholder: "Select Barangay",
			        allowClear: true
			 }); 
			$('#brgylocated_ec').select2({
			        placeholder: "Select Barangay",
			        allowClear: true
			 });
		    

			// if(a.rs[0].ec_cum == ""){
			// 	$('#ecicum').prop("disabled",1);
			// 	$('#ecinow').prop("disabled",1);	
			// }else{
			// 	$('#ecicum').prop("disabled",!1);
			// 	$('#ecinow').prop("disabled",!1);
			// }

			$('#ecicum').prop("disabled",false);
			$('#ecinow').prop("disabled",false);
			$('#ecistatus').prop("disabled",false);

			$('#ecicum').val(a.rs[0].ec_cum);
			$('#ecinow').val(a.rs[0].ec_now);
			$('#ecname').val(a.rs[0].evacuation_name.toUpperCase());
			$('#ecfamcum').val(a.rs[0].family_cum);
			$('#ecfamnow').val(a.rs[0].family_now);
			$('#ecpercum').val(a.rs[0].person_cum);
			$('#ecpernow').val(a.rs[0].person_now);
			$('#ecplaceorigin1').val(a.rs[0].place_of_origin);

			// if(a.rs[0].ec_status == ""){
			// 	$('#ecistatus').prop("disabled",1);
			// }else{
			// 	$('#ecistatus').prop("disabled",!1);
			// }
			
			$('#ecistatus').val(a.rs[0].ec_status);
			ecstatus = a.rs[0].ec_status;

			$('#ec_remarks').val(a.rs[0].ec_remarks);

			// $('#addfaminsideECprov').prop("disabled",true);
			// $('#addfaminsideECcity').prop("disabled",true);
			// $('#ecname').prop("disabled",true);
			// $('#ecplaceorigin').prop("disabled",true);

		});

		setTimeout(function(){
			$('#addfaminsideEC').modal("show");
			$('#loader').hide();



		},1500);
	}

}

$('#clearECS').click(function(){

	$('#ecicum').val('');
	$('#ecinow').val('');

	$('#ecfamcum').val('');
	$('#ecfamnow').val('');

	$('#ecpercum').val('');
	$('#ecpernow').val('');

	$('#ecistatus').val('');
	$('#ecistatus').prop('disabled', true);

	$('#ecplaceorigin').val('');

	$('#ecicum').prop('disabled', true);
	$('#ecinow').prop('disabled', true);
	//$('#ecistatus').prop('disabled', true);

	$('#updateECS').hide();
	$('#deleteECS').hide();
	$('#clearECS').hide();

	$('#addECS').show();
	$('#addAECS').show();
	$('#addCECS').show();
	$('#addMECS').show();


})


$('#updateECS').click(function(){

	returnZeroVal = (value) =>{
		if(value === null || value === 0 || value === ""){
			return 0;
		}
		return value;
	}

	$('#loader').show();

	var origin = "";

	for(var i = 0 ; i < $('#ecplaceorigin :selected').length ; i++){

		if(i == 0){
			origin = $('#ecplaceorigin :selected')[i].value;
		}else{
			origin =  origin + "," + $('#ecplaceorigin :selected')[i].value;
		}

	}

	var datas = {
		id 				: evac_id,
		eciprov 		: $('#addfaminsideECprov').val(),
		ecicity 		: $('#addfaminsideECcity').val(),
		ecicum 			: returnZeroVal($('#ecicum').val()),
		ecinow 			: returnZeroVal($('#ecinow').val()),
		eciname 		: $('#ecname').val(),
		ecifamcum 		: returnZeroVal($('#ecfamcum').val()),
		ecifamnow 		: returnZeroVal($('#ecfamnow').val()),
		ecipercum 		: returnZeroVal($('#ecpercum').val()),
		ecipernow 		: returnZeroVal($('#ecpernow').val()),
		brgy_located 	: $('#brgylocated_ec').val(),
		eciplaceorigin 	: origin,
		ecstatus 		: $('#ecistatus').val(),
		ec_remarks 		: $('#ec_remarks').val(),
	};

	var uriID = URLID();


	$.getJSON("/Pages/updateEC",datas,function(a){
		if(a == 1){

			$('#loader').hide();

			$('#addfaminsideEC').modal("hide");
			get_dromic(uriID);
			// issuesfound();
		}  
	});

})

$('#deleteECS').click(function(){

	var datas = {
		id 				: evac_id
	};

	var uriID = URLID();

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/deleteECS",datas,function(a){
						if(a == 1){
							$('#addfaminsideEC').modal("hide");
							get_dromic(uriID);
						}  
					});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue'
	    	}
	    }
	});

})

$('#ecfamcum').keyup(function(){
	$('#ecfamnow').val($(this).val());
})

$('#ecpercum').keyup(function(){
	$('#ecpernow').val($(this).val());
})

$('#saveasnewrecord').click(function(){

	var uriID = URLID();

	var datas = {
		id : uriID
	}

	$.getJSON("/Pages/getECMain",datas,function(a){
		addnewReport(a[0].dromic_id);
	});

})
$('#errmsgnewdromicec').hide();
function savenewDromicEC(){

	var uriID = URLID();

	var datas = {
		id 					: newi,
		oid 				: uriID,
		newreporttitle 		: $('#newreporttitle').val(),
		newreportdate 		: $('#newreportdate').val(),
		newreporttime 		: $('#newreporttime').val(),
		preparedby 			: $('#preparedby').val(),
		recommendedby 		: $('#recommendedby').val(),
		approvedby 			: $('#approvedby').val(),
		preparedbypos 		: $('#preparedbypos').val(),
		recommendedbypos 	: $('#recommendedbypos').val(),
		approvedbypos 		: $('#approvedbypos').val()
	}

	if(datas.newreporttitle == "" || datas.newreportdate == "" || datas.newreporttime == "" || datas.preparedby == "" || datas.recommendedby == "" || datas.approvedby == "" || datas.preparedbypos == "" || datas.recommendedbypos == "" || datas.approvedbypos == ""){

		$('#errmsgnewdromicec').show();
		$('#errmsgnewdromicec').empty().append("<span class='fa fa-info-circle'></span> Kindly fill all fields to continue!");
		setTimeout(function(){
			$('#errmsgnewdromicec').fadeOut();
		},1500);

	}else{
		$('#addnewReport').modal('hide');

		$.getJSON("/Pages/saveasnewrecordEC",datas,function(a){

			window.location.href = +Pages/"?XCqdPsmLaQwAyt="+a;

		});
	}
}

$('#adddamass').click(function(){

	$('#adddamageasst').modal("show");

	$('#upDamAss').hide();
	$('#deleteDamAss').hide();
	$('#saveDamAss').show();
	
	$('#addDamprov').prop("disabled",!1);
	$('#addDamcity').prop("disabled",!1);

	$('#addDamprov').val('');
	$('#addDamcity').val('');

	$('#nlgu').val('');
	$('#nngo').val('');


})

function savenewDamAss(){

	var uriID = URLID();

	if($('#addDamprov').val() == "" || $('#addDamcity').val() == ""){
		msgbox("Select Province and Municipality to Continue!");
	}else{

		if($('#nlgu').val() == "" && $('#nngo').val() == ""){
			msgbox("Kindly input cost of assistance from LGU or from NGO/NGA/Other GOs to continue!");
		}else{

			var datas = {
				disaster_title_id 	: uriID,
				municipality_id 	: $('#addDamcity').val(),
				provinceid 			: $('#addDamprov').val(),
				totally_damaged 	: $('#ntotally').val(),
				partially_damaged 	: $('#npartially').val(),
				dead 				: $('#ndead').val(),
				injured 			: $('#ninjured').val(),
				missing 			: $('#nmising').val(),
				dswd_asst 			: $('#ndswd').val(),
				lgu_asst 			: $('#nlgu').val(),
				ngo_asst 			: $('#nngo').val()
			};

			$.getJSON("/Pages/saveasnewDamAss",datas,function(a){

				if(a == 1){
					$('#adddamageasst').modal('hide');
					alerts();
					get_dromic(uriID);
				}

			});
		}

	}

} 

var upDamAssid = []; 
$('#upDamAss').hide();

function updateDamAss(o){

	if($('#can_edit').text() == 'f'){

		msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

	}else{

		$('#adddamageasst').modal("show");
		$('#upDamAss').show();
		$('#deleteDamAss').show();
		$('#saveDamAss').hide();

		var datas = {
			id : o
		}

		upDamAssid = [];
		upDamAssid.push(o);

		$.getJSON("/Pages/getDamAss",datas,function(a){

			$('#addDamprov').val(a.rs[0].provinceid);

			$('#addDamcity').empty().append(
				"<option value=''>-- Select City/Municipality --</option>"
			);
			for(var j in a.city){
				$('#addDamcity').append(
					"<option value='"+a.city[j].id+"'>"+a.city[j].municipality_name+"</option>"
				);
			}

			$('#addDamcity').val(a.rs[0].municipality_id);			
			$('#ntotally').val(a.rs[0].totally_damaged);
			$('#npartially').val(a.rs[0].partially_damaged);
			$('#ndead').val(a.rs[0].dead);
			$('#nmising').val(a.rs[0].missing);
			$('#ninjured').val(a.rs[0].injured);
			$('#ndswd').val(a.rs[0].dswd_asst);
			$('#nlgu').val(a.rs[0].lgu_asst);
			$('#nngo').val(a.rs[0].ngo_asst);

			$('#addDamprov').prop("disabled",1);
			$('#addDamcity').prop("disabled",1);

		});
	}

}

$('#upDamAss').click(function(){

	var uriID = URLID();

	if($('#nlgu').val() == "" && $('#nngo').val() == ""){
		msgbox("Kindly input cost of assistance from LGU or from NGO/NGA/Other GOs to continue!");
	}else{

		var datas = {
			id 					: upDamAssid[0],
			municipality_id 	: $('#addDamcity').val(),
			provinceid 			: $('#addDamprov').val(),
			totally_damaged 	: $('#ntotally').val(),
			partially_damaged 	: $('#npartially').val(),
			dead 				: $('#ndead').val(),
			injured 			: $('#ninjured').val(),
			missing 			: $('#nmising').val(),
			dswd_asst 			: $('#ndswd').val(),
			lgu_asst 			: $('#nlgu').val(),
			ngo_asst 			: $('#nngo').val()
		};

		$.getJSON("/Pages/updateDamAss",datas,function(a){

			if(a == 1){
				$('#adddamageasst').modal("hide");	
				get_dromic(uriID);
			}

		});
	}

})

$('#deleteDamAss').click(function(){

	var uriID = URLID();

	var datas = {
		id 		: upDamAssid[0]
	};

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/deleteDamAss",datas,function(a){
	    				if(a == 1){
	    					$('#adddamageasst').modal('hide');
	    					get_dromic(uriID);
	    				}
	    			});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue'
	    	}
	    }
	});

});

$('#addfamoec').click(function(){

	$('#addfamOEC').modal("show");
	$('#saveFamOEC').show();
	$('#upFamOEC').hide();

	$('#addfamOECprov').prop("disabled",!1);
	$('#addfamOECcity').prop("disabled",!1);

	$('#delFamOEC').hide();

})

$('#upFamOEC').hide();
function savenewfamOEC(){

	var uriID = URLID();

	if($('#addfamOECprov').val() == "" || $('#addfamOECcity').val() == "" || $('#addfamOECbrgy').val() == ""){
		msgbox("Kindly select Host LGU [Province, Municipality and Barangay] to continue!");
	}else{

		if($('#famcumO').val() == "" || $('#famnowO').val() == "" || $('#personcumO').val() == "" || $('#personnowO').val() == ""){

			msgbox("Kindly input Family Cum, Family Now, Person Cum, Person Now to continue!");

		}else{

			if($('#addfamOECprovO').val() == "" || $('#addfamOECcityO').val() == "" || $('#addfamOECbrgyO').val() == ""){
				msgbox("Kindly select Place of Origin [Province, Municipality and Barangay] to continue!");
			}else{

				if($('#addfamOECbrgyO').val() == "OTHERS" && $('#addfamOECbrgyOothers').val() == ""){

					msgbox("Kindly input place of origin to continue!");

				}else{

					var brgy_origin  = "";

					if($('#addfamOECbrgyO').val() == "OTHERS"){
						brgy_origin = $('#addfamOECbrgyOothers').val();
					}else{
						brgy_origin = $('#addfamOECbrgyO').val();
					}

					if($('#addfamOECbrgy').val() == "NOT INDICATED"){
						var brgy_host = "0";
					}else{
						var brgy_host = $('#addfamOECbrgy').val()
					}

					var datas = {

						disaster_title_id 		: uriID,
						provinceid 				: $('#addfamOECprov').val(),	
						municipality_id 		: $('#addfamOECcity').val(),	
						family_cum 				: $('#famcumO').val(),	
						family_now 				: $('#famnowO').val(),	
						person_cum 				: $('#personcumO').val(),	
						person_now 				: $('#personnowO').val(),	
						brgy_host 				: brgy_host,
						brgy_origin 			: brgy_origin,
						province_origin 		: $('#addfamOECprovO').val(),
						municipality_origin 	: $('#addfamOECcityO').val()

					};	

					$.getJSON("/Pages/savenewfamOEC",datas,function(a){
						if(a == 1){
							alerts();
							get_dromic(uriID);
							$('#addfamOEC').modal("hide");
						}else{
							alertError();
						}
					});
				}
			}
		}

	}

}

var upfamOECid = [];

function updatefamOEC(o){

	$('#addfamOEC').modal("show");
	$('#addfamOECprov').prop("disabled",1);
	$('#addfamOECcity').prop("disabled",1);

	$('#saveFamOEC').hide();
	$('#upFamOEC').show();
	$('#delFamOEC').show();

	upfamOECid = [];
	upfamOECid.push(o);

	var datas = {
		id : o
	};

	$.getJSON("/Pages/getFamOEC",datas,function(a){

		$('#addfamOECprov').val(a.rs[0].provinceid);

		$('#addfamOECcity').empty().append(
			"<option value=''>-- Select City/Municipality --</option>"
		);
		for(var j in a.city){
			$('#addfamOECcity').append(
				"<option value='"+a.city[j].id+"'>"+a.city[j].municipality_name+"</option>"
			);
		}
		$('#addfamOECcity').val(a.rs[0].municipality_id);

		$('#famcumO').val(isnull(a.rs[0].family_cum));
		$('#famnowO').val(isnull(a.rs[0].family_now));
		$('#personcumO').val(isnull(a.rs[0].person_cum));
		$('#personnowO').val(isnull(a.rs[0].person_now));
		$('#numbrgyO').val(isnull(a.rs[0].affbrgy));

	});

}

function updateFamOEC(){

	returnZeroVal = (value) =>{
		if(value === null || value === 0 || value === "0" || value ===""){
			return 0;
		}
		return value;
	}

	var uriID = URLID();

	var brgy_origin = "";

	if($('#addfamOECbrgyO').val() == "OTHERS"){
		brgy_origin = $('#addfamOECbrgyOothers').val();
	}else{
		brgy_origin = $('#addfamOECbrgyO').val();
	}

	var datas = {

		id 						: upfamOECid[0],
		provinceid 				: $('#addfamOECprov').val(),	
		municipality_id 		: $('#addfamOECcity').val(),	
		family_cum 				: returnZeroVal($('#famcumO').val()),	
		family_now 				: returnZeroVal($('#famnowO').val()),	
		person_cum 				: returnZeroVal($('#personcumO').val()),	
		person_now 				: returnZeroVal($('#personnowO').val()),	
		brgy_host 				: $('#addfamOECbrgy').val(),
		province_origin 		: $('#addfamOECprovO').val(),	
		municipality_origin 	: $('#addfamOECcityO').val(),
		brgy_origin 			: brgy_origin

	};

	$.getJSON("/Pages/updateFamOEC",datas,function(a){
		if(a == 1){
			$('#addfamOEC').modal("hide");	
			get_dromic(uriID);
		}
	});
 
}

$('#delFamOEC').click(function(){

	var uriID = URLID();

	var datas = {
		id 					: upfamOECid[0]
	};

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
	    buttons: {
	    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Yes',
		    		btnClass: 'btn-red',
		    		action: function(){
		    			$.getJSON("/Pages/delFamOEC",datas,function(a){
							if(a == 1){
								$('#addfamOEC').modal("hide");	
								get_dromic(uriID);
							}
						});
		            }
		    	},
		    	cancelAction: {
		    		text: '<i class="fa fa-times-circle"></i> No',
		    		btnClass: 'btn-blue'
		    	}
		    }
	});

});

$('#addcasualtybtn').click(function(){

	$('#addCasualtyModal').modal("show");
	$('#updatecasualty').hide();
	$('#addcasualty').show();
	$('#deletecasualty').hide();

	$('#addcasualtyprov').prop("disabled",!1);
	$('#addcasualtycity').prop("disabled",!1);

})

function savenewCAS(){

	if($('#addcasualtyprov').val() == "" || $('#addcasualtycity').val() == "" || $('#addcasualtybrgy').val() == "" || $('#addcasualtylname').val() == "" || $('#addcasualtyfname').val() == "" || $("#addcasualtyage").val() == ""){
		msgbox("Following fields are required [Province, Municipality, Place of Origin, Lastname, Firstname and Age].");
	}else{

		var uriID = URLID();
		var dead 	= "";
		var missing = "";
		var injured = "";

		var iscasualty = $('[name="iscasualty"]');

		if(iscasualty[0].checked){
			dead = "t";
			missing = "f";
			injured = "f";
		}else if(iscasualty[1].checked){
			missing = "t";
			dead = "f";
			injured = "f";
		}else if(iscasualty[2].checked){
			injured = "t";
			missing = "f";
			dead = "f";
		}

		if(dead == "" || missing == "" || injured == ""){
			msgbox("Kindly indicate casualty type to continue!");
		}else{

			var datas = {
				disaster_title_id 		: uriID,
				lastname 				: $('#addcasualtylname').val(),
				firstname 				: $('#addcasualtyfname').val(),
				middle_i				: $('#addcasualtymi').val(),
				gender 					: $('#addcasualtysex').val(),
				provinceid 				: $('#addcasualtyprov').val(),
				municipalityid 			: $('#addcasualtycity').val(),
				brgyname 				: $('#addcasualtybrgy').val(),
				isdead 					: dead,
				ismissing 				: missing,
				isinjured 				: injured,
				remarks 				: $('#addcasualtyremarks').val(),
				age 					: $('#addcasualtyage').val()
			};

			$.getJSON("/Pages/savenewCAS",datas,function(a){
				if(a == 1){
					$('#addCasualtyModal').modal("hide");
					get_dromic(uriID);
				}
			});
		}
	}

}

$('#updatecasualty').hide();
var upcasualtyid = [];
function getCasualty(id){

	if($('#can_edit').text() == 'f'){
		msgbox("You're not allowed to edit this entry. Kindly contact the administrator");
	}else{

		$('#addCasualtyModal').modal("show");
		$('#updatecasualty').show();
		$('#addcasualty').hide();
		$('#deletecasualty').show();

		$('#addcasualtyprov').prop("disabled",1);
		$('#addcasualtycity').prop("disabled",1);

		upcasualtyid = [];
		upcasualtyid.push(id);

		var datas = {
			id : id
		};

		$('#addcasualtycity').empty().append(
			"<option value=''>-- Select City/Municipality --</option>"
		)

		var iscasualty = $('[name="iscasualty"]');

		$.getJSON("/Pages/getCasualty",datas,function(a){

			$('#addcasualtylname').val(a.rs[0].lastname);
			$('#addcasualtyfname').val(a.rs[0].firstname);
			$('#addcasualtymi').val(a.rs[0].middle_i);
			$('#addcasualtysex').val(a.rs[0].gender);
			$('#addcasualtyprov').val(a.rs[0].provinceid);
			for(var h in a.city){
				$('#addcasualtycity').append(
					"<option value='"+a.city[h].id+"'>"+a.city[h].municipality_name+"</option>"
				)
			}
			$('#addcasualtycity').val(a.rs[0].municipalityid);
			$('#addcasualtybrgy').val(a.rs[0].brgyname);
			$('#addcasualtyremarks').val(a.rs[0].remarks);
			$('#addcasualtyage').val(a.rs[0].age);

			if(a.rs[0].isdead == 't'){
				iscasualty[0].checked = 1;
			}

			if(a.rs[0].ismissing == 't'){
				iscasualty[1].checked = 1;
			}

			if(a.rs[0].isinjured == 't'){
				iscasualty[2].checked = 1;
			}

		});
	}

}

function updateCAS(){

	var uriID = URLID();
	var dead 	= "";
	var missing = "";
	var injured = "";

	var iscasualty = $('[name="iscasualty"]');

	if(iscasualty[0].checked){
		dead = "t";
		missing = "f";
		injured = "f";
	}else if(iscasualty[1].checked){
		missing = "t";
		dead = "f";
		injured = "f";
	}else if(iscasualty[2].checked){
		injured = "t";
		missing = "f";
		dead = "f";
	}

	var datas = {
		id 						: upcasualtyid[0],
		lastname 				: $('#addcasualtylname').val(),
		firstname 				: $('#addcasualtyfname').val(),
		middle_i				: $('#addcasualtymi').val(),
		gender 					: $('#addcasualtysex').val(),
		provinceid 				: $('#addcasualtyprov').val(),
		municipalityid 			: $('#addcasualtycity').val(),
		brgyname 				: $('#addcasualtybrgy').val(),
		isdead 					: dead,
		ismissing 				: missing,
		isinjured 				: injured,
		remarks 				: $('#addcasualtyremarks').val(),
		age 					: $('#addcasualtyage').val()
	};

	$.getJSON("/Pages/updateCAS",datas,function(a){
		if(a == 1){
			$('#addCasualtyModal').modal("hide");
			get_dromic(uriID);
		}
	});

}

function deleteCAS(){

	var uriID = URLID();

	var datas = {
		id 						: upcasualtyid[0]
	};

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Deleting this data may cause discrepancy from previous reporting. Do you wish to continue?',
	    buttons: {
	    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Yes',
		    		btnClass: 'btn-red',
		    		action: function(){
		    			$.getJSON("/Pages/deleteCAS",datas,function(a){
							if(a == 1){
								$('#addCasualtyModal').modal("hide");
								get_dromic(uriID);
							}
						});
		            }
		    	},
		    	cancelAction: {
		    		text: '<i class="fa fa-times-circle"></i> No',
		    		btnClass: 'btn-blue'
		    	}
		    }
	});

}


// setInterval(function(){

// 	$.getJSON("/Pages/countEOpCen",function(a){

// 		$('#counteopcen').text(a['allcount']);
// 		$('#countinec').text(a['inec']);
// 		$('#countdammass').text(a['damass']);
// 		$('#countoutec').text(a['outec']);
// 		$('#countcasual').text(a['casualty']);
// 		$('#countpics').text(a['uppics']);

// 	});

// 	$('#div_cinec').load(opcenip+"pcinec/cinec");
// 	$('#div_coutec').load(opcenip+"pcoutec/coutec");
// 	$('#div_cdamass').load(opcenip+"pcdamass/cdamass");
// 	$('#div_ccasualty').load(opcenip+"pccasualty/ccasualty");
// 	$('#div_cpics').load(opcenip+"pcpics/cpics");

// },1500)

var picEnlarge = function(e){

	var datas = {
		id : e
	}

	$.getJSON("/Pages/picEnlarge",datas,function(a){
		$('#pictureModal').modal('show');
		var image = document.getElementById('cpictureenlarge');
    	image.src = 'assets/drr_app/upload/'+a.uppicsdet[0].pics;
	});
}

$('#markreadinec').click(function(){

	$.getJSON("/Pages/markreadinec",function(a){
		console.log(1);
	});

});

$('#markreaddamass').click(function(){

	$.getJSON("/Pages/markreaddamass",function(a){
		console.log(1);
	});

});

$('#markreadoutec').click(function(){

	$.getJSON("/Pages/markreadoutec",function(a){
		console.log(1);
	});

});

$('#markreadcasualty').click(function(){

	$.getJSON("/Pages/markreadcasualty",function(a){
		console.log(1);
	});

});

$('#markreaduploads').click(function(){

	$.getJSON("/Pages/markreaduploads",function(a){
		console.log(1);
	});

});

// setInterval(function(e){

// 	newMessage();
// 	//viewMessage();
// 	//getquake();

// 	$.getJSON("/Pages/countEOpCen",function(a){
// 		$('#counteopcen').text(a['allcount']);
// 	});


// },3500)

var peopcen = $('#markreadinec');

// if(peopcen.length){

// 	setInterval(function(e){

// 		$.getJSON("/Pages/countEOpCen",function(a){

// 			$('#counteopcen').text(a['allcount']);
// 			$('#countinec').text(a['inec']);
// 			$('#countdammass').text(a['damass']);
// 			$('#countoutec').text(a['outec']);
// 			$('#countcasual').text(a['casualty']);
// 			$('#countpics').text(a['uppics']);
// 			$('#ddamage').text(a['cdamage']);

// 		});

// 		notificationINEC();
// 		notificationOUTEC();
// 		notificationCASUALTY();
// 		notificationAssistance();
// 		notificationDamages();
// 		notificationPic();


// 	},3500)

// 	$('#div_cinec').load(opcenip+"pcinec/cinec");
// 	$('#div_coutec').load(opcenip+"pcoutec/coutec");
// 	$('#div_cdamass').load(opcenip+"pcdamass/cdamass");
// 	$('#div_ccasualty').load(opcenip+"pccasualty/ccasualty");
// 	$('#div_cpics').load(opcenip+"pcpics/cpics");
// 	$('#div_ddamage').load(opcenip+"pcdamage/cdamage");

// }

function notificationINEC(){
	$.getJSON(opcenip+"cinecnotif",function(a){
		if(a.length > 0){
			for(var i in a){
			      var body = "Evacuation Alert: "+a[i].evacuation_name+" @"+a[i].municipality_name+", "+ a[i].province_name;
			      notify(body,"eopcen");
			}
		}
	});
}

function notificationOUTEC(){
	$.getJSON(opcenip+"coutecnotif",function(a){
		if(a.length > 0){
			for(var i in a){
				var body = "Outside Evacuation Alert: F: "+ a[i].fam_no+"/ P: "+a[i].person_no+" @ "+a[i].municipality_name+", "+a[i].province_name;
			    notify(body,"eopcen");
			}
		}
	});
}

function notificationCASUALTY(){
	$.getJSON(opcenip+"casualtynotif",function(a){
		if(a.length > 0){
			for(var i in a){
		      var body = "Casualty Alert: "+a[i].gender+ "- "+ a[i].lname+ ", "+a[i].fname+ " from "+a[i].brgyname+", "+a[i].municipality_name;
		      notify(body,"eopcen");
			}
		}
	});
}

function notificationAssistance(){
	$.getJSON(opcenip+"assistnotif",function(a){
		if(a.length > 0){
			for(var i in a){
			      var body = "New Cost of Assistance Alert!";
			      notify(body,"eopcen");
			}
		}
	});
}

function notificationPic(){
	$.getJSON(opcenip+"picnotif",function(a){
		if(a.length > 0){
			for(var i in a){
				var body =  "New Photo Uploaded!";
			  	notify(body,"eopcen");
			}
		}
	});
}

function notificationDamages(){
	$.getJSON(opcenip+"damagesnotif",function(a){
		if(a.length > 0){
			for(var i in a){
				var body =  "Damages Alert....";
			  	notify(body,"eopcen");
			}
		}
	});
}

function newMessage(){

	$.getJSON(opcenip+"newMessage",function(a){
		if(a.length > 0){
			if(a[0].msgcount > 0){
				var body =  "Alert! " + a[0].msgcount + " message(s) received!";
				notify(body,"inbox");
			}
		}
	});

}

var divinbox = $('#divinbox');

if(divinbox.length){

	$.getJSON("/Pages/getDromic",function(a){
		for(var h in a){
			$('#disasterreportstitle').append(
				"<option value='"+a[h].id+"'>"+a[h].disaster_name+"</option>"
			)
		}
	});

	var finmsg = [];
	viewMessage();
	$('#disasterreportstitlelabel').hide();
}

function viewMessage(){

	var msg = "";
	var i = 0;

	var msg2 = "";
	var msg3 = "";
	var msg4 = "";
	var msg5 = "";

	var messages = [];
	var msgx = [];
	var msgy = [];

	$.getJSON(opcenip+"viewMessage",function(a){

		var bh = a;

		for(var i = 0 ; i < a.length ; i++){

			msg = a[i].sms_text;
			msg = msg.split("|");

			msg2 = msg[msg.length-1];

			msgx.push({
				message 	: a[i].sms_text,
				time 		: a[i].sent_dt,
				number 		: a[i].sender_number,
				ref_code 	: msg2
			})

		}

		// console.log(msgx);

		for(var k  = 0 ; k < msgx.length ; k++){

			if(msgx[k].message.substr(0,2) == "E|" || msgx[k].message.substr(0,2) == "X|" || msgx[k].message.substr(0,2) == "O|"){

				if(msgx[k].message.length <= 100){

					msgy.push({
						message 	: msgx[k].message,
						time 		: msgx[k].time,
						number 		: msgx[k].number
					})
					
				}else{
					for(var l  = 0 ; l < msgx.length ; l++){
						if(k == l){
							
							var fstr = "";
							var estr = "";

							// console.log(msgx[l].message);

							var str2 = msgx[l].message;
							str2 = str2.split("|");

							for(var r  = 0 ; r < str2.length ; r++){
								if(r == 0){
									estr = estr + "" + str2[0];
								}else{
									estr = estr + "|" + str2[r];
								}
							}

							msgy.push({
								message 	: fstr + "" + estr,
								time 		: msgx[k].time,
								number 		: msgx[k].number
							})


						}else{

							if(msgx[k].ref_code == msgx[l].ref_code){

								var str1 = msgx[k].message;
								str1 = str1.split("|");

								var str2 = msgx[l].message;
								str2 = str2.split("|");

								var fstr = "";
								var estr = "";

								for(var g  = 0 ; g < str1.length-1 ; g++){
									if(g == 0){
										fstr = fstr + "" + str1[0];
									}else{
										fstr = fstr + "|" + str1[g];
									}
								}

								for(var r  = 0 ; r < str2.length-1 ; r++){
									if(r == 0){
										estr = estr + "" + str2[0];
									}else{
										estr = estr + "|" + str2[r];
									}
								}

								msgy.push({
									message 	: fstr + "" + estr,
									time 		: msgx[k].time,
									number 		: msgx[k].number
								})
								break;
							}
						}
					}
				}
			}

		}

		for(i = 0 ; i < msgy.length ; i++){
			messages.push({
				message 	: msgy[i].message,
				time 		: msgy[i].time,
				number 		: msgy[i].number
			});
		}

		for(i = 0 ; i < a.length ; i++){

			if(a[i].sms_text.substr(0,2) != "E|" && a[i].sms_text.substr(0,2) != "X|" && a[i].sms_text.substr(0,2) != "O|"){

				messages.push({
					message 	: a[i].sms_text,
					time 		: a[i].sent_dt,
					number 		: a[i].sender_number
				});
			}

		}

		for(var m = 0 ; m < messages.length ; m++){

			if(messages[m].message.substr(0,2) == "E|" || messages[m].message.substr(0,2) == "C|" || messages[m].message.substr(0,2) == "X|" || messages[m].message.substr(0,2) == "D|" || messages[m].message.substr(0,2) == "O|"){
				finmsg.push({
					id 			: m,
					message 	: messages[m].message,
					time 		: messages[m].time,
					number 		: messages[m].number
				});
			}

		}

		af = finmsg.sort(function(obj1, obj2) {
			// Ascending: first age less than the previous
			return new Date(obj2.time) - new Date(obj1.time);

		});

		//console.log(af);
		// for(var n = 0 ; n < finmsg_r.length ; n++){

		// }

		$('#divinbox').empty();

		for(var o = 0 ; o < finmsg.length ; o++){

			var fmsg = finmsg[o].message;
			var fmsg = fmsg.split("|");



			if(finmsg[o].message.substr(0,2) == "E|"){

///////////////////////////////////////////////////////////////////////

				$('#msg_ecstatus tbody').append(
					"<tr>"+
						"<td>"+fmsg[8]+"</td>"+
						"<td>"+fmsg[1]+"</td>"+
						"<td>"+fmsg[2]+"</td>"+
						"<td>"+fmsg[9]+"</td>"+
						"<td>"+fmsg[3]+"</td>"+
						"<td>"+fmsg[4]+"</td>"+
						"<td>"+fmsg[5]+"</td>"+
						"<td>"+fmsg[6]+"</td>"+
						"<td>"+fmsg[7]+"</td>"+
						"<td>"+finmsg[o].time+"</td>"+
						"<td>"+fmsg[10]+"</td>"+
						"<td>"+
							//"<button type='button' style='text-align:center' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Add to disaster report' onclick='AddtoDisasterReport("+finmsg[o].id+")'><span class='fa fa-plus-circle'></span></button>"+
						"</td>"+
					"</tr>"
				)

///////////////////////////////////////////////////////////////////////

				$('#divinbox').append(
					"<div class='col-sm-8'>"+
						"<div class='alert alert-info' style='text-align: left'>"+

								" <h4> <strong> Evacuation Center Status </strong> </h4> " +

								"Evacuation Center Name : " + fmsg[3] +
								"<br> Province Name:  " + fmsg[1] +
								"<br> Municipality Name: " + fmsg[2] +
								"<br> Brgy. Located (EC) : " + fmsg[9] +
								"<br> EC Status : " + fmsg[4] +
								"<br> Families Affected : " + fmsg[5] +
								"<br> Persons Affected : " + fmsg[6] +
								"<br> Place of Origin (Evacuees) : " + fmsg[7] +
						"</div>"+
					"</div>"
				)

				$('#divinbox').append(
					"<div class='col-sm-4'>"+
						"<small class='pull-right'> Disaster Name: " + fmsg[8] + "</small>" +
						"<br> <small class='pull-right'> Date/Time: " + finmsg[o].time + "</small>" +
						"<br> <small class='pull-right'> From: " + isnull(fmsg[10]) + " | " +  "+" + finmsg[o].number + "</small>"+
					"</div>"
				)



			}else if(finmsg[o].message.substr(0,2) == "X|"){

//////////////////////////////////////////////////////////////////////////////

				$('#msg_castatus tbody').append(
					"<tr>"+
						"<td>"+fmsg[1]+"</td>"+
						"<td>"+fmsg[2]+"</td>"+
						"<td>"+fmsg[3]+"</td>"+
						"<td>"+fmsg[4]+"</td>"+
						"<td>"+fmsg[5]+"</td>"+
						"<td>"+fmsg[6]+"</td>"+
						"<td>"+fmsg[7]+"</td>"+
						"<td>"+fmsg[8]+"</td>"+
						"<td>"+fmsg[9]+"</td>"+
						"<td>"+fmsg[10]+"</td>"+
						"<td>"+finmsg[o].time+"</td>"+
						"<td>"+fmsg[11]+"</td>"+
						"<td>"+
							//"<button type='button' style='text-align:center' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Add to disaster report' onclick='AddtoDisasterReport("+finmsg[o].id+")'><span class='fa fa-plus-circle'></span></button>"+
						"</td>"+
					"</tr>"
				)

//////////////////////////////////////////////////////////////////////////////

				$('#divinbox').append(
					"<div class='col-sm-8'>"+
						"<div class='alert alert-info' style='text-align: left'>"+
								" <h4> <strong> Casualty Status </strong> </h4> " +
								"Fullname : " + fmsg[5] + " " + fmsg[6] + " " + fmsg[4] +
								"<br> Location: " + fmsg[3] + ", " + fmsg[2] +
								"<br> Age : " + fmsg[7] +
								" | Sex : " + fmsg[8] +
								"<br> Place of Origin : " + fmsg[9] +
								"<br> Status : " + fmsg[10] +
						"</div>"+
					"</div>"
				)

				$('#divinbox').append(
					"<div class='col-sm-4'>"+
						"<small class='pull-right'> Disaster Name: " + fmsg[1] + "</small>" +
						"<br> <small class='pull-right'> Date/Time: " + finmsg[o].time + "</small>" +
						"<br> <small class='pull-right'> From: " + isnull(fmsg[11]) + " | " +  "+" + finmsg[o].number + "</small>"+
					"</div>"
				)

			}else if(finmsg[o].message.substr(0,2) == "C|"){

////////////////////////////////////////////////////////////////////////
				$('#msg_coststatus tbody').append(
					"<tr>"+
						"<td>"+fmsg[1]+"</td>"+
						"<td>"+fmsg[2]+"</td>"+
						"<td>"+fmsg[3]+"</td>"+
						"<td>"+fmsg[4]+"</td>"+
						"<td>"+fmsg[5]+"</td>"+
						"<td>"+finmsg[o].time+"</td>"+
						"<td>"+fmsg[6]+"</td>"+
						"<td>"+
							//"<button type='button' style='text-align:center' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Add to disaster report' onclick='AddtoDisasterReport("+finmsg[o].id+")'><span class='fa fa-plus-circle'></span></button>"+
						"</td>"+
					"</tr>"
				)
////////////////////////////////////////////////////////////////////////

				$('#divinbox').append(
					"<div class='col-sm-8'>"+
						"<div class='alert alert-info' style='text-align: left'>"+
								" <h4> <strong> Cost of Assistance Status </strong> </h4> " +
								"Province Name : " + fmsg[2] +
								"<br> Municipality Name: " + fmsg[3] + 
								"<br> Cost of Assistance from LGU : " + fmsg[4] +
								"<br> Cost of Assistance from NGO/NGA/Other GOs : " + fmsg[5] +
						"</div>"+
					"</div>"
				)

				$('#divinbox').append(
					"<div class='col-sm-4'>"+
						"<small class='pull-right'> Disaster Name: " + fmsg[1] + "</small>" +
						"<br> <small class='pull-right'> Date/Time: " + finmsg[o].time + "</small>" +
						"<br> <small class='pull-right'> From: " + isnull(fmsg[6]) + " | " +  "+" + finmsg[o].number + "</small>" +
					"</div>"
				)

			}else if(finmsg[o].message.substr(0,2) == "O|"){
//////////////////////////////////////////////////////////////////////////
				$('#msg_outecstatus tbody').append(
					"<tr>"+
						"<td>"+fmsg[6]+"</td>"+
						"<td>"+fmsg[1]+"</td>"+
						"<td>"+fmsg[2]+"</td>"+
						"<td>"+fmsg[3]+"</td>"+
						"<td>"+fmsg[4]+"</td>"+
						"<td>"+fmsg[5]+"</td>"+
						"<td>"+finmsg[o].time+"</td>"+
						"<td>"+fmsg[7]+"</td>"+
						"<td>"+fmsg[8]+"</td>"+
						"<td>"+fmsg[9]+"</td>"+
						"<td>"+fmsg[10]+"</td>"+
						"<td>"+
							//"<button type='button' style='text-align:center' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Add to disaster report' onclick='AddtoDisasterReport("+finmsg[o].id+")'><span class='fa fa-plus-circle'></span></button>"+
						"</td>"+
					"</tr>"
				)
//////////////////////////////////////////////////////////////////////////
				
				$('#divinbox').append(
					"<div class='col-sm-8'>"+
						"<div class='alert alert-info' style='text-align: left'>"+
								" <h4> <strong> Outside Evacuation Status </strong> </h4> " +
								"Host LGU (Place of Displacemnet) : " + fmsg[3] + ", " + fmsg[2] + ", " + fmsg[1] +
								"<br> Affected Families: " + fmsg[4] + 
								"<br> Affected Persons : " + fmsg[5] +
								"<br> Place of Origin (Evacuees) : " + fmsg[9] + ", " + fmsg[8] + ", " + fmsg[7] +
								
						"</div>"+
					"</div>"
				)

				$('#divinbox').append(
					"<div class='col-sm-4'>"+
						"<small class='pull-right'> Disaster Name: " + fmsg[6] + "</small>" +
						"<br> <small class='pull-right'> Date/Time: " + finmsg[o].time + "</small>" +
						"<br> <small class='pull-right'> From: " + isnull(fmsg[10]) + " | " +  "+" + finmsg[o].number + "</small>" +
					"</div>"
				)
	

			}else if(finmsg[o].message.substr(0,2) == "D|"){
////////////////////////////////////////////////////////////////////////
				$('#msg_damstatus tbody').append(
					"<tr>"+
						"<td>"+fmsg[3]+"</td>"+
						"<td>"+fmsg[1]+"</td>"+
						"<td>"+fmsg[2]+"</td>"+
						"<td>"+fmsg[4]+"</td>"+
						"<td>"+fmsg[5]+"</td>"+
						"<td>"+fmsg[6]+"</td>"+
						"<td>"+fmsg[7]+"</td>"+
						"<td>"+fmsg[8]+"</td>"+
						"<td>"+fmsg[9]+"</td>"+
						"<td>"+finmsg[o].time+"</td>"+
						"<td>"+fmsg[10]+"</td>"+
						"<td>"+
							//"<button type='button' style='text-align:center' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Add to disaster report' onclick='AddtoDisasterReport("+finmsg[o].id+")'><span class='fa fa-plus-circle'></span></button>"+
						"</td>"+
					"</tr>"
				)
////////////////////////////////////////////////////////////////////////

				$('#divinbox').append(
					"<div class='col-sm-8'>"+
						"<div class='alert alert-info' style='text-align: left'>"+
								" <h4> <strong> Damages Status </strong> </h4> " +
								"Province Name : " + fmsg[1] +
								"<br> Municipality Name: " + fmsg[2] + 
								"<br> Barangay : " + fmsg[4] +
								"<br> Partially Damaged : " + fmsg[5] + " | " + "Totally Damaged : " + fmsg[6] +
								"<br> Dead : " + fmsg[7] + " | " + "Missing : " + fmsg[8] + " | " + "Injured : " + fmsg[9] + 
								
						"</div>"+
					"</div>"
				)

				$('#divinbox').append(
					"<div class='col-sm-4'>"+
						"<small class='pull-right'> Disaster Name: " + fmsg[3] + "</small>" +
						"<br> <small class='pull-right'> Date/Time: " + finmsg[o].time + "</small>" +
						"<br> <small class='pull-right'> From: " + isnull(fmsg[10]) + " | " +  "+" + finmsg[o].number + "</small>" +
					"</div>"
				)

			}

		}

		$('[data-toggle="tooltip"]').tooltip();

		$('#msg_ecstatus').DataTable({
			pageLength 		: 5,
			bLengthChange 	: !1
		});

		$('#msg_castatus').DataTable({
			pageLength 		: 5,
			bLengthChange 	: !1
		});

		$('#msg_coststatus').DataTable({
			pageLength 		: 5,
			bLengthChange 	: !1
		});

		$('#msg_outecstatus').DataTable({
			pageLength 		: 5,
			bLengthChange 	: !1
		});

		$('#msg_damstatus').DataTable({
			pageLength 		: 5,
			bLengthChange 	: !1
		});

	});

}

function AddtoDisasterReport(i){

	$('#AddtoDisasterReport').modal('show');
	$('#savetodisasterreport').val(i);

}

$('#savetodisasterreport').click(function(){

	var i = $('#savetodisasterreport').val();

	for(var t = 0 ; t < finmsg.length ; t++){
		if(i == finmsg[t].id){
			var text = finmsg[t].message;
			break;
		}
	}

	text = text.split("|");

	var datas = {
		data : {
			dromic_id 	: $('#disasterreportstitle').val(),
			message 	: text	
		}
	}

	if(datas.data.dromic_id == ""){
		$('#disasterreportstitlelabel').show();
		setTimeout(function(){
			$('#disasterreportstitlelabel').hide(500);
		},2000)
	}else{

		$.getJSON("/Pages/savetoDisasterReport",datas,function(a){
			if(a == 0){
				msgbox("No latest report created with the selected disaster title.")
			}else{
				console.log(1);
			}
		})

	}


})

$('#exporttoexcel').click(function(){

	if(toexcel == 1){
		tbl = "tbl_masterquery_rev";
		name = "DROMIC Master Excel";
	}else if(toexcel == 2){
		tbl = "tbl_damage_assistance";
		name = "Damages and Assistance";
	}else if(toexcel == 3){
		tbl = "tbl_evac_stats";
		name = "Inside Evacuation Status";
	}else if(toexcel == 4){
		tbl = "tbl_evacuation_stats_outside";
		name = "Outside Evacuation Status";
	}else if(toexcel == 5){
		tbl = "tbl_ccasualties";
		name = "Casualties";
	}else if(toexcel == 6){
		tbl = "tbl_evacuation_sex_age";
		name = "Sex and Age Data";
	}else if(toexcel == 7){
		tbl = "tbl_masterquery_summary";
		name = "DROMIC Master Excel Summary";
	}else if(toexcel == 8){
		tbl = "tbl_evacuation_sex_age_summary";
		name = "DROMIC SAD Data Summary_Now ";
	}  

	toExcelTable(tbl,name);

})

$('#toexcel1').click(function(){
	toexcel = 1;
})

$('#toexcel2').click(function(){
	toexcel = 2;
})

$('#toexcel3').click(function(){
	toexcel = 3;
})

$('#toexcel4').click(function(){
	toexcel = 4;
})

$('#toexcel5').click(function(){
	toexcel = 5;
})

$('#toexcel_sex_age').click(function(){
	toexcel = 6;
})

$('#report_summary').click(function(){
	toexcel = 7;
})

$('#toexcel_all_summary').click(function(){
	toexcel = 7;
})

$('#toexcel_sad_summary').click(function(){
	toexcel = 8;
})

var toExcelTable = function(tbl,name){

	$("#"+tbl).table2excel({
		exclude 	: ".noExl",
		name 		: name,
		filename 	: name+"@"+asof
	});

}

// Mask 

$('#newreporttime').mask('00:00 AA');
$('#newreportdate').mask('0000-00-00')

$('#ecicum').mask('0');
$('#ecinow').mask('0');

function getquake(){

	$.getJSON("/Pages/get_allquake",function(a){
		if(a['quake'].length > 0){
			for(var j in a['quake']){
			  var body = "Earthquake Alert: Location: "+a['quake'][j].location+" Mag.: "+a['quake'][j].magnitude+" Depth: "+a['quake'][j].depth;
			  notify(body,"earthquake");
			}
		}
	});

}

var tblearthquake = $('#tblearthquake');
if(tblearthquake.length){
	getEarthquake();
}

function totime(item){
	var a = new Date(item);
	return a.timeNow();
}

Date.prototype.timeNow = function(){

    return ((this.getHours() < 10)?"0":"") + ((this.getHours()>12)?(this.getHours()-12):this.getHours()) +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds() + ((this.getHours()>=12)?(' PM'):' AM'); 

};

function getEarthquake(){

	$.getJSON("/Pages/getEarthquake",function(a){
		for(var g in a){
			$('#tblearthquake tbody').append(
				"<tr>"+
					"<td style='font-size:12px'>"+(Number(g)+1)+"</td>"+
					"<td style='font-size:12px'>"+a[g].location.toUpperCase()+"</td>"+
					"<td style='font-size:12px'>"+a[g].depth+"</td>"+
					"<td style='font-size:12px'>"+a[g].latitude+"</td>"+
					"<td style='font-size:12px'>"+a[g].longitude+"</td>"+
					"<td style='font-size:12px'>"+a[g].magnitude+"</td>"+
					"<td style='font-size:12px'>"+todate(a[g].date_time)+"</td>"+
					"<td style='font-size:12px'>"+totime(a[g].date_time)+"</td>"+
					"<td><button class='btn btn-danger btn-xs' onclick='viewOnMap("+a[g].latitude+","+a[g].longitude+")'><i class='fa fa-eye'></i></button></td>"+
				"</tr>"
			)
		}
		$('#tblearthquake').DataTable({
			pageLength : 20,
			bLengthChange : !1
		});
	})

}

function weathertextforecast(){

	$.getJSON("/Pages/getWeather",function(response){

		console.log(response);

		$('#issuedat').append(todate(" "+response.result[1].date)+" "+response.result[1].time);
		$('#weathertextforecast').append(
		    "<p style='text-align:justify'>"+response.result[1].filipino+"</p> <hr class='line'>"+
		    "<p style='text-align:justify'>"+response.result[1].forecast+"</p> <hr class='line'>"+
		    "<p style='text-align:justify'>"+response.result[1].synopsis+"</p> <hr class='line'>"+
		    "<p style='text-align:justify'>"+response.result[1].sun_first+"</p>"+
		    "<p style='text-align:justify'>"+response.result[1].sun_second+"</p>"+
		    "<p style='text-align:justify'>"+response.result[1].moon_first+"</p>"+
		    "<p style='text-align:justify'>"+response.result[1].moon_second+"</p>"
		)

		$('#weathertextforecasts').append(
		    "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].filipino+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"+
	         "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].forecast+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"+
	         "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].synopsis+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"+
	         "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].sun_first+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"+
	         "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].sun_second+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"+
	         "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].moon_first+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"+
	         "<li>"+
	            "<div class='block'>"+
	              "<div class='block_content'>"+
	                "<h2 class='title'>"+
	                    "<a>"+response.result[1].moon_second+"</a>"+
	                "</h2>"+
	              "</div>"+
	            "</div>"+
	         "</li>"
		)

	})

}


var weathertextforecasts = $('#weathertextforecast');
var wcast = $('#weathertextforecasts');	
if(weathertextforecasts.length || wcast.length){
	weathertextforecast();
}


windowHeight = $(window).height();

$('#weatherradars').css('min-height', Number(windowHeight)-100);
$('#picmap').css('min-height', Number(windowHeight)-300);

// Desktop Notifications ===========================================================================================================================================

function notify(body,page){

	if (Notification.permission !== "granted"){
		Notification.requestPermission();
	}else {
	var notification = new Notification('DSWD DROMIC', {
	  icon: base_url+"images/dromic1.jpg",
	  body:body,
	});

	notification.onclick = function () {
	  window.open(base_url+page);
	  this.close();
	};

	}

}

$('#map').css('min-height', Number(windowHeight)-150);
$('#drrmap').css('min-height', Number(windowHeight)-50);

$('#animate').click(function(){

	var animate = $(this);

	if(animate[0].checked == 1){
		$('#weatherobj').attr('data',"http://121.58.193.148/repo/mtsat-colored/24hour/latest-him-colored.gif");
		$('#toanimate').attr('title',"Click to stop animation of weather image and view latest weather image.");
	}else{
		$('#weatherobj').attr('data',"http://121.58.193.148/repo/mtsat-colored/24hour/1-him-colored.png");
		$('#toanimate').attr('title',"Click to view animation of weather image and view recent weather images.");
	}

})

var radarphp = $('#radarphp');

$('#addnew_qrtsstaff').click(function(){
	$('#tbl_qrtsstaff tbody').append(
		"<tr>"+
			"<td style='width:99%'> <input type='text' class='form-control input-sm' placeholder='QRT Team Support Staff' name='qrtsstaff'> </td>"+
      		"<td> <button type='button' class='btn btn-primary btn-sm removeSStaff'><span class='fa fa-minus'></button> </td>"+
		"</tr>"
	)
})

$('#addnew_qrtdriver').click(function(){
	$('#tbl_qrtdriver tbody').append(
		"<tr>"+
			"<td style='width:99%'> <input type='text' class='form-control input-sm' placeholder='QRT Team Driver' name='qrtdriver'> </td>"+
      		"<td> <button type='button' class='btn btn-warning btn-sm removeDriver'><span class='fa fa-minus'></button> </td>"+
		"</tr>"
	)
})

$("#tbl_qrtsstaff").on('click','.removeSStaff',function(){

	var rowCount = $('#tbl_qrtsstaff >tbody >tr').length;

	if(rowCount <= 1){
		alertRowErr();
	}else{
		if($(this).val() != ""){
			var datas = {
				id : $(this).val()
			}
			$.confirm({
			    title: '<span class="red">Confirm Action!</span>',
			    content: 'Are you sure you want to delete this data? This action cannot be undone.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Yes',
			    		btnClass: 'btn-red',
			    		action: function(){
			    			$.getJSON("/Pages/deleteQRTTeamDriverStaff",datas,function(a){
			    				QRTTeams();
			    			});
			            }
			    	},
			    	cancelAction: {
			    		text: '<i class="fa fa-times-circle"></i> No',
			    		btnClass: 'btn-blue'
			    	}
			    }
			});
		}else{
			$(this).closest('tr').remove();
		}
	}

});

$("#tbl_qrtdriver").on('click','.removeDriver',function(){
	var rowCount = $('#tbl_qrtdriver >tbody >tr').length;
	if(rowCount <= 1){
		alertRowErr();
	}else{
		if($(this).val() != ""){
			var datas = {
				id : $(this).val()
			}
			$.confirm({
			    title: '<span class="red">Confirm Action!</span>',
			    content: 'Are you sure you want to delete this data? This action cannot be undone.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Yes',
			    		btnClass: 'btn-red',
			    		action: function(){
			    			$.getJSON("/Pages/deleteQRTTeamDriverStaff",datas,function(a){
			    				QRTTeams();
			    			});
			            }
			    	},
			    	cancelAction: {
			    		text: '<i class="fa fa-times-circle"></i> No',
			    		btnClass: 'btn-blue'
			    	}
			    }
			});
		}else{
			$(this).closest('tr').remove();
		}
	}
});

$('#qrtteamnumber').change(function(){

	var datas = {
		number : $(this).val()
	}

	$.getJSON("/Pages/checkQRTNumber",datas,function(response){
		if(response.length >= 1){
			alertQRTNumberExist();
			$('#qrtteamnumber').val("");
		}
	})

})	

$('#savedata_qrt').click(function(){

	var staff = $('[name="qrtsstaff"]');
	var driver = $('[name="qrtdriver"]');

	var qstaff = [];
	var qdriver = [];

	if($('#qrtteamnumber').val() == "" || $('#qrtleader').val() == "" || $('#qrtstatistician').val() == ""){
		alertnoQRTNumber();
	}else{

		for(var i = 0 ; i < staff.length ; i++){
			qstaff.push({
				qrt_team_id 		: $('#qrtteamnumber').val(),
				fullname 			: staff[i].value,
				qrt_position_id 	: 4
			});
		}

		for(var i = 0 ; i < driver.length ; i++){
			qdriver.push({
				qrt_team_id 		: $('#qrtteamnumber').val(),
				fullname 			: driver[i].value,
				qrt_position_id 	: 5
			});
		}

		var datas = {
			leader : {
				qrt_team_id 		: $('#qrtteamnumber').val(),
				fullname 			: $('#qrtleader').val(),
				qrt_position_id 	: 1,
			},
			statistician : {
				qrt_team_id 		: $('#qrtteamnumber').val(),
				fullname 			: $('#qrtstatistician').val(),
				qrt_position_id 	: 2,
			},
			smu : {
				qrt_team_id 		: $('#qrtteamnumber').val(),
				fullname 			: $('#qrtsmu').val(),
				qrt_position_id 	: 6,
			},
			aa : {
				qrt_team_id 		: $('#qrtteamnumber').val(),
				fullname 			: $('#qrtaa').val(),
				qrt_position_id 	: 3,
			},
			qstaff,
			qdriver
		}

		$.getJSON("/Pages/saveQRT",datas,function(response){
			if(response == 1){
				alerts();
				$('#resetdata_qrt').trigger('click');
			}else{
				alertError();
			}
		})
	}

})

$('#updatedata_qrt').click(function(){

	var staff = $('[name="qrtsstaff"]');
	var driver = $('[name="qrtdriver"]');

	var qstaff = [];
	var qdriver = [];

	if($('#qrtteamnumber').val() == "" || $('#qrtleader').val() == "" || $('#qrtstatistician').val() == ""){
		alertnoQRTNumber();
	}else{

		for(var i = 0 ; i < staff.length ; i++){
			qstaff.push({
				fullname 			: staff[i].value,
				id 					: staff[i].title
			});
		}

		for(var i = 0 ; i < driver.length ; i++){
			qdriver.push({
				fullname 			: driver[i].value,
				id 					: driver[i].title
			});
		}

		var datas = {
			leader : {
				fullname 			: $('#qrtleader').val(),
				id 					: $('#qrtleader').attr("title")
			},
			statistician : {
				fullname 			: $('#qrtstatistician').val(),
				id 					: $('#qrtstatistician').attr("title")
			},
			smu : {
				fullname 			: $('#qrtsmu').val(),
				id 					: $('#qrtsmu').attr("title")
			},
			aa : {
				fullname 			: $('#qrtaa').val(),
				id 					: $('#qrtaa').attr("title")
			},
			qstaff,
			qdriver
		}

		$.getJSON("/Pages/updateQRT",datas,function(response){
			if(response == 1){
				alerts();
				QRTTeams();
			}else{
				alertError();
			}
		})
	}

})
var qrtteamspanel = $('#qrtteamspanel');
if(qrtteamspanel.length){
	QRTTeams();
}

function QRTTeams(){

	$('#qrtteamspanel').empty();

	$.getJSON("/Pages/getAllQRT",function(response){
		for(var i = 0; i < response['team'].length ; i++){
			if(i == 0){
				var ins = "in";
			}else{
				var ins  = "out";
			}
			$('#qrtteamspanel').append(
				"<div class='panel panel-primary' style='border-radius:0px'>"+
			      "<div class='panel-heading' style='border-radius:0px'>"+
			        "<h4 class='panel-title'>"+
			          "<a data-toggle='collapse' data-parent='#qrtteamspanel' href='#collapse"+response['team'][i].id+"'>"+response['team'][i].qrt_team+"</a>"+
			        "</h4>"+
			      "</div>"+
			      "<div id='collapse"+response['team'][i].id+"' class='panel-collapse collapse "+ins+"'>"+
			        "<div class='panel-body'>"+
			        	"<table id='tbl_qrt"+response['team'][i].id+"' class='table'>"+
			        		"<thead>"+
			        			"<tr>"+
			        				"<th> Name </th>"+
			        				"<th> Role </th>"+
			        			"</tr>"+
			        		"</thead>"+
			        		"<tbody>"+
			        		"</tbody>"+
			        	"</table>"+
			        "</div>"+
			        "<div class='panel-footer'>"+
			        	"<button type='button' class='btn btn-danger btn-sm' onclick='UpdateQRTTeam("+response['team'][i].id+")'><i class='fa fa-edit'></i> Update QRT Team Composition</button>"+
			        "</div>"+ 
			      "</div>"+
			    "</div>"
			)
		}

		for(var i = 0; i < response['members'].length ; i++){
			$('#tbl_qrt'+response['members'][i].qrt_team_id+' tbody').append(
				"<tr>"+
    				"<td>"+response['members'][i].fullname+"</td>"+
    				"<td>"+response['members'][i].position_name+"</td>"+
    			"</tr>"
			)
		}

	});

}

function UpdateQRTTeam(id){

	var datas = {
		id 	: id
	};

	$.getJSON("/Pages/getSpecQRT",datas,function(a){
		$('#tbl_qrtsstaff tbody').empty();
		$('#tbl_qrtdriver tbody').empty();
		$('#qrtteamnumber').val(a['members'][0].qrt_team_id);

		$('#qrtteamnumber').attr("disabled",1);
		$('#savedata_qrt').attr("disabled",1);
		$('#updatedata_qrt').attr("disabled",!1);
		$('#deletedata_qrt').attr("disabled",!1);

		for(var i in a['members']){
			if(a['members'][i].qrt_position_id == 1){
				$('#qrtleader').val(a['members'][i].fullname);
				$('#qrtleader').attr("title",a['members'][i].id);
			}
			if(a['members'][i].qrt_position_id == 2){
				$('#qrtstatistician').val(a['members'][i].fullname);
				$('#qrtstatistician').attr("title",a['members'][i].id);
			}
			if(a['members'][i].qrt_position_id == 6){
				$('#qrtsmu').val(a['members'][i].fullname);
				$('#qrtsmu').attr("title",a['members'][i].id);
			}
			if(a['members'][i].qrt_position_id == 3){
				$('#qrtaa').val(a['members'][i].fullname);
				$('#qrtaa').attr("title",a['members'][i].id);
			}

			if(a['members'][i].qrt_position_id == 4){
				$('#tbl_qrtsstaff tbody').append(
					"<tr>"+
						"<td style='width:99%'> <input type='text' class='form-control input-sm' placeholder='QRT Team Support Staff' name='qrtsstaff' value='"+a['members'][i].fullname+"' title="+a['members'][i].id+"> </td>"+
			      		"<td> <button type='button' class='btn btn-primary btn-sm removeSStaff' value='"+a['members'][i].id+"'><span class='fa fa-minus'></button> </td>"+
					"</tr>"
				)
			}
			if(a['members'][i].qrt_position_id == 5){
				$('#tbl_qrtdriver tbody').append(
					"<tr>"+
						"<td style='width:99%'> <input type='text' class='form-control input-sm' placeholder='QRT Team Driver' name='qrtdriver' value='"+a['members'][i].fullname+"' title="+a['members'][i].id+"> </td>"+
			      		"<td> <button type='button' class='btn btn-warning btn-sm removeDriver' value='"+a['members'][i].id+"'><span class='fa fa-minus'></button> </td>"+
					"</tr>"
				)
			}
		}

	})
}

$('#resetdata_qrt').click(function(){

	$('#tbl_qrtsstaff >tbody >tr').remove();
	$('#tbl_qrtsstaff tbody').append(
		"<tr>"+
			"<td style='width:99%'> <input type='text' class='form-control input-sm' placeholder='QRT Team Support Staff' name='qrtsstaff'> </td>"+
      		"<td> <button type='button' class='btn btn-primary btn-sm removeSStaff'><span class='fa fa-minus'></button> </td>"+
		"</tr>"
	)

	$('#tbl_qrtdriver >tbody >tr').remove();
	$('#tbl_qrtdriver tbody').append(
		"<tr>"+
			"<td style='width:99%'> <input type='text' class='form-control input-sm' placeholder='QRT Team Driver' name='qrtdriver'> </td>"+
      		"<td> <button type='button' class='btn btn-warning btn-sm removeDriver'><span class='fa fa-minus'></button> </td>"+
		"</tr>"
	)

	$('#qrtteamnumber').attr("disabled",!1);
	$('#savedata_qrt').attr("disabled",!1);
	$('#updatedata_qrt').attr("disabled",1);
	$('#deletedata_qrt').attr("disabled",1);

})

$('#deletedata_qrt').click(function(){

	var datas = {
		id 	: $('#qrtteamnumber').val()
	}

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Are you sure you want to delete this data? This action cannot be undone.',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/deleteQRTTeam",datas,function(a){
	    				$('#resetdata_qrt').trigger("click");
	    			});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue'
	    	}
	    }
	});

});

var aff_families = $('#aff_families');
if(aff_families.length){
	dashboard();
}

function dashboard(){

	$.getJSON("/Pages/getDashboardData",function(response){

		$('#aff_families').text(response.aff_family.toLocaleString());
		$('#aff_individuals').text(response.aff_person.toLocaleString());
		$('#tot_assistance').text(response.dswd_asst.toLocaleString());
		$('#aff_brgy').text(response.aff_brgy.toLocaleString());
		$('#aff_inec').text(response.aff_familyinec.toLocaleString());
		$('#aff_outec').text(response.aff_familyoutec.toLocaleString());

		piechart(response.pie_aff_family,response.pie_aff_family_drill,'tot_family_graph','Graph of Affected Families Inside and Outside EC','Since Armed Conflict in Marawi City','Total Affected Families');

		piechart(response.pie_dswd_asst,response.pie_asst_drill,'tot_assistance_graph','Graph of DSWD Augmentation Assistance','Since Armed Conflict in Marawi City','Monetized Amount');

		columnchart(response.pie_aff_family,response.pie_aff_family_drill,'tot_family_graph_column','Graph of Affected Families Inside and Outside EC','Since Armed Conflict in Marawi City','Total Affected Families');
		
	});

}

var piechart = function(data,datadrill,container, title, subtitle,label){

	var $div = $('#'+container);

	if($div.length){

		Highcharts.createElement('link', {
		   href: 'https://fonts.googleapis.com/css?family=Signika:400,700',
		   rel: 'stylesheet',
		   type: 'text/css'
		}, null, document.getElementsByTagName('head')[0]);

		// Add the background image to the container
		Highcharts.wrap(Highcharts.Chart.prototype, 'getContainer', function (proceed) {
		   proceed.call(this);
		   this.container.style.background = 'url(http://www.highcharts.com/samples/graphics/sand.png)';
		});


		Highcharts.theme = {
		   colors: ['#B0E0E6',
					'#800080',
					'#663399',
					'#FF0000',
					'#BC8F8F',
					'#4169E1',
					'#8B4513',
					'#FA8072',
					'#F4A460',
					'#2E8B57',
					'#DB7093',
					'#A0522D',
					'#C0C0C0',
					'#87CEEB',
					'#6A5ACD',
					'#708090',
					'#708090',
					'#008000',
					'#00FF7F',
					'#4682B4',
					'#D2B48C',
					'#008080',
					'#D8BFD8',
					'#FF6347',
					'#40E0D0',
					'#EE82EE',
					'#F5DEB3',
					'#006400',
					'#BDB76B',
					'#8B008B',
					'#556B2F',
					'#FF8C00',
					'#9932CC',
					'#8B0000',
					'#E9967A',
					'#8FBC8F',
					'#483D8B',
					'#2F4F4F',
					'#2F4F4F',
					'#00CED1',
					'#9400D3',
					'#FF1493',
					'#00BFFF'
				],
		   chart: {
		      backgroundColor: 'rgba(0, 0, 0, 0.85)',
		      style: {
		         fontFamily: 'Signika, serif'
		      }
		   },
		   title: {
		      style: {
		         color: '#fff',
		         fontSize: '16px',
		         fontWeight: 'lighter'
		      }
		   },
		   subtitle: {
		      style: {
		         color: '#fff'
		      }
		   },
		   tooltip: {
		      borderWidth: 0
		   },
		   legend: {
		      itemStyle: {
		         fontWeight: 'lighter',
		         fontSize: '13px',
		         color: '#fff'
		      }
		   },
		   xAxis: {
		      labels: {
		         style: {
		            color: '#6e6e70'
		         }
		      }
		   },
		   yAxis: {
		      labels: {
		         style: {
		            color: '#6e6e70'
		         }
		      }
		   },
		   plotOptions: {
		      series: {
		         shadow: true
		      },
		      candlestick: {
		         lineColor: '#404048'
		      },
		      map: {
		         shadow: false
		      }
		   },

		   // Highstock specific
		   navigator: {
		      xAxis: {
		         gridLineColor: '#D0D0D8'
		      }
		   },
		   rangeSelector: {
		      buttonTheme: {
		         fill: 'white',
		         stroke: '#C0C0C8',
		         'stroke-width': 1,
		         states: {
		            select: {
		               fill: '#D0D0D8'
		            }
		         }
		      }
		   },
		   scrollbar: {
		      trackBorderColor: '#C0C0C8'
		   },

		   // General
		   background2: 'rgba(0, 0, 0, 0.85)',

		};

		Highcharts.setOptions(Highcharts.theme);


		Highcharts.chart(container, {
		    chart: {
		        type: 'pie',
		        options3d: {
		            enabled: !1,
		            alpha: 45,
		            beta: 0
		        }
		    },
		    title: {
		        text: title
		    },
		    subtitle: {
		    	text: null
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.y}</b>'
		    },
		    plotOptions: {
		        pie: {
		            allowPointSelect: true,
		            cursor: 'pointer',
		            dataLabels: {
		                enabled: false,
		                format: '{point.name}'
		            },
		            innerSize: 0,
		            depth: 30,
		            showInLegend: true
		        }
		    },
		    series: [{
		        name: label,
		        colorByPoint: true,
		        data: data
		    }],
		    drilldown : {
		    	series : datadrill
		    }
		});

	}

}

var columnchart = function(data,datadrill,container, title, subtitle,label){

	var $div = $('#'+container);

	if($div.length){

			Highcharts.createElement('link', {
			   href: 'https://fonts.googleapis.com/css?family=Unica+One',
			   rel: 'stylesheet',
			   type: 'text/css'
			}, null, document.getElementsByTagName('head')[0]);

			Highcharts.theme = {
			   colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
			      '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
			   chart: {
			      backgroundColor: {
			         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
			         stops: [
			            [0, '#2a2a2b'],
			            [1, '#3e3e40']
			         ]
			      },
			      style: {
			         fontFamily: 'Arial'
			      },
			      plotBorderColor: '#606063'
			   },
			   title: {
			      style: {
			         color: '#E0E0E3',
			         textTransform: 'uppercase',
			         fontSize: '20px'
			      }
			   },
			   subtitle: {
			      style: {
			         color: '#E0E0E3',
			         textTransform: 'uppercase'
			      }
			   },
			   xAxis: {
			      gridLineColor: '#707073',
			      labels: {
			         style: {
			            color: '#E0E0E3'
			         }
			      },
			      lineColor: '#707073',
			      minorGridLineColor: '#505053',
			      tickColor: '#707073',
			      title: {
			         style: {
			            color: '#A0A0A3'

			         }
			      },
			      categories : [
			      	data.name
			      ]
			   },
			   yAxis: {
			      gridLineColor: '#707073',
			      labels: {
			         style: {
			            color: '#E0E0E3'
			         }
			      },
			      lineColor: '#707073',
			      minorGridLineColor: '#505053',
			      tickColor: '#707073',
			      tickWidth: 1,
			      title: {
			         style: {
			            color: '#A0A0A3',
			         }
			      }
			   },
			   tooltip: {
			      backgroundColor: 'rgba(0, 0, 0, 0.85)',
			      style: {
			         color: '#F0F0F0'
			      }
			   },
			   plotOptions: {
			      series: {
			         dataLabels: {
			            color: '#B0B0B3'
			         },
			         marker: {
			            lineColor: '#333'
			         }
			      },
			      boxplot: {
			         fillColor: '#505053'
			      },
			      candlestick: {
			         lineColor: 'white'
			      },
			      errorbar: {
			         color: 'white'
			      }
			   },
			   legend: {
			      itemStyle: {
			         color: '#E0E0E3'
			      },
			      itemHoverStyle: {
			         color: '#FFF'
			      },
			      itemHiddenStyle: {
			         color: '#606063'
			      }
			   },
			   credits: {
			      style: {
			         color: '#666'
			      }
			   },
			   labels: {
			      style: {
			         color: '#707073'
			      }
			   },

			   drilldown: {
			      activeAxisLabelStyle: {
			         color: '#F0F0F3'
			      },
			      activeDataLabelStyle: {
			         color: '#F0F0F3'
			      }
			   },

			   navigation: {
			      buttonOptions: {
			         symbolStroke: '#DDDDDD',
			         theme: {
			            fill: '#505053'
			         }
			      }
			   },

			   // scroll charts
			   rangeSelector: {
			      buttonTheme: {
			         fill: '#505053',
			         stroke: '#000000',
			         style: {
			            color: '#CCC'
			         },
			         states: {
			            hover: {
			               fill: '#707073',
			               stroke: '#000000',
			               style: {
			                  color: 'white'
			               }
			            },
			            select: {
			               fill: '#000003',
			               stroke: '#000000',
			               style: {
			                  color: 'white'
			               }
			            }
			         }
			      },
			      inputBoxBorderColor: '#505053',
			      inputStyle: {
			         backgroundColor: '#333',
			         color: 'silver'
			      },
			      labelStyle: {
			         color: 'silver'
			      }
			   },

			   navigator: {
			      handles: {
			         backgroundColor: '#666',
			         borderColor: '#AAA'
			      },
			      outlineColor: '#CCC',
			      maskFill: 'rgba(255,255,255,0.1)',
			      series: {
			         color: '#7798BF',
			         lineColor: '#A6C7ED'
			      },
			      xAxis: {
			         gridLineColor: '#505053'
			      }
			   },

			   scrollbar: {
			      barBackgroundColor: '#808083',
			      barBorderColor: '#808083',
			      buttonArrowColor: '#CCC',
			      buttonBackgroundColor: '#606063',
			      buttonBorderColor: '#606063',
			      rifleColor: '#FFF',
			      trackBackgroundColor: '#404043',
			      trackBorderColor: '#404043'
			   },

			   // special colors for some of the
			   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
			   background2: '#505053',
			   dataLabelsColor: '#B0B0B3',
			   textColor: '#C0C0C0',
			   contrastTextColor: '#F0F0F3',
			   maskColor: 'rgba(255,255,255,0.3)'
			};

		Highcharts.setOptions(Highcharts.theme);


		Highcharts.chart(container, {
		    chart: {
		        type: 'column',
		        options3d: {
		            enabled: true,
		            alpha: 0,
		            beta: 15,
		            depth: 100,
		            viewDistance: 25
		        }
		    },
		    title: {
		        text: title
		    },
		    subtitle: {
		    	text: null
		    },
		    yAxis: {
		        min: 0,
		        title: {
		            text: 'Affected Families'
		        }
		    },
		    tooltip: {
		        pointFormat: '{series.name}: <b>{point.y}</b>'
		    },
		    plotOptions: {
	            allowPointSelect: true,
	            cursor: 'pointer',
	            dataLabels: {
	                enabled: true,
	                format: '{point.name}'
	            },
	            innerSize: 0,
	            depth: 30,
	            showInLegend: true
		    },
		    series: [{
		        name: label,
		        colorByPoint: true,
		        data: data
		    }],
		    drilldown : {
		    	series : datadrill
		    }
		});

	}

}

$('#addasstfnfi').click(function(){

	if($('#fnfiassistance').val() == "" || $('#fnficost').val() == "" || $('#fnfiquantity').val() == ""){
		$.confirm({
		    title: '',
		    content: '<i class="fa fa-info-circle"></i> Kindly fill province, municipality, augmentation date and augmentation assistance list to continue',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-times-circle-o"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{

		fnfi_list.push({
			fnfi_name 		: $('#fnfiassistance').val(),
			fnfi_cost 		: $('#fnficost').val(),
			fnfi_quantity 	: $('#fnfiquantity').val()
		});

		fnfi_list_item();

		$('#fnfiassistance').val('');
		$('#fnficost').val('');
		$('#fnfiquantity').val('');
	}

})

var fnfi_list_item = function(){

	var rtotal = 0;

	$('#tbl_assistance_list tbody').empty();
	for(var i in fnfi_list){
		rtotal = parseFloat(rtotal) + (parseFloat(fnfi_list[i].fnfi_cost) * parseFloat(fnfi_list[i].fnfi_quantity));
		$('#tbl_assistance_list tbody').append(
			"<tr>"+
				"<td>"+
					fnfi_list[i].fnfi_name+
				"</td>"+
				"<td>"+
					fnfi_list[i].fnfi_cost+
				"</td>"+
				"<td style='text-align:right'>"+
					fnfi_list[i].fnfi_quantity+
				"</td>"+
				"<td style='text-align:right'>"+
					parseFloat(fnfi_list[i].fnfi_cost) * parseFloat(fnfi_list[i].fnfi_quantity)+
				"</td>"+
				"<td style='vertical-align:middle; text-align:center'> <button type='button' class='btn btn-danger btn-xs removefnfi' value='"+i+"'><span class='fa fa-remove'></button> </td>"+
			"</tr>"
		)
	}

	$('#fnfi_running_total').text(rtotal.toLocaleString());

}

$("#tbl_assistance_list").on('click','.removefnfi',function(){

	var a = $(this).val();
	$(this).closest('tr').remove();

	fnfi_list.splice(a,1);

	fnfi_list_item();

});

$('#saveassistance').click(function(){

	var datas = {
		details : {
			disaster_title_id 			: URLID(),
			provinceid 					: $('#provinceAssistance').val(),
			municipality_id 			: $('#cityAssistance').val(),
			family_served 				: $('#families_served').val(),
			remarks 					: $('#fnfi_remarks').val()
		},
		date_augmented 					: todate2($('#single_cal3').val()),
		fnfi_list
	};

	var urlid = URLID();

	

	if(datas.provinceid == "" || datas.municipality_id == "" || datas.date_augmented == "" || fnfi_list.length < 1){
		$.confirm({
		    title: '',
		    content: '<i class="fa fa-info-circle"></i> Kindly fill province, municipality, augmentation date and augmentation assistance list to continue',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-times-circle-o"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		$.getJSON("/Pages/saveFNFILIST",datas,function(response){
			if(response == 1){
				alerts();
				get_dromic(urlid);
				$('#provinceAssistance').val('');
				$('#cityAssistance').val('');
				$('#families_served').val('');
				$('#fnfi_remarks').val('');
				$('#single_cal3').val('');
				fnfi_list = [];
				fnfi_list_item();
			}
		});
	}

})

var tbl_augmentation_list = $('#tbl_augmentation_list');

if(tbl_augmentation_list.length){

	var assttyperelief = $('#assttyperelief').val();

	var yearss = new Date();
	y = $.datepicker.formatDate('yy', new Date(yearss));
	m = $.datepicker.formatDate('mm', new Date(yearss));

	get_augmentation_list(m,y,assttyperelief);
}

function get_augmentation_list(month,year,assttyperelief){

	$('#tbl_augmentation_list tbody').empty();

	var datas = {
		month 			: month,
		year 			: year,
		assttyperelief 	: assttyperelief
	};

	$.getJSON("/Pages/get_augmentation_assistance",datas,function(a){

		for(var i in a){

			if(i == 0){
				$('#tbl_augmentation_list tbody').append(
					"<tr style='cursor:pointer'>"+
						"<td data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].municipality_name+"</td>"+
						"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].number_served+"</td>"+
						"<td style='text-align:right' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+addComma(Number(a[i].cost) * Number(a[i].quantity))+"</td>"+
						"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].assistance_name+"</td>"+
						"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].asst_type+"</td>"+
						"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+todate(a[i].date_augmented)+"</td>"+
					"</tr>"
				)
			}else{
				if(a[i].municipality_id == a[i-1].municipality_id){
					if((a[i].municipality_id == a[i-1].municipality_id) && (a[i].number_served == a[i-1].number_served) && (a[i].date_augmented == a[i-1].date_augmented)){
						var serve = "";
					}else{
						var serve = a[i].number_served;
					}
					$('#tbl_augmentation_list tbody').append(
						"<tr style='cursor:pointer'>"+
							"<td data-toggle='tooltip' title='"+a[i].remarks_particulars+"' style='color:#fff'>"+a[i].municipality_name+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+serve+"</td>"+
							"<td style='text-align:right' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+addComma(Number(a[i].cost) * Number(a[i].quantity))+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].assistance_name+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].asst_type+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+todate(a[i].date_augmented)+"</td>"+
						"</tr>"
					)
				}else{
					$('#tbl_augmentation_list tbody').append(
						"<tr style='cursor:pointer'>"+
							"<td data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].municipality_name+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].number_served+"</td>"+
							"<td style='text-align:right' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+addComma(Number(a[i].cost) * Number(a[i].quantity))+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].assistance_name+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+a[i].asst_type+"</td>"+
							"<td style='text-align:center' data-toggle='tooltip' title='"+a[i].remarks_particulars+"'>"+todate(a[i].date_augmented)+"</td>"+
						"</tr>"
					)
				}
			}

		}
		$('[data-toggle="tooltip"]').tooltip();

	});

}

var tbl_reliefassistance = $('#tbl_reliefassistance');
if(tbl_reliefassistance.length){

	var edate = new Date();

	get_reliefassistance_report(edate.getFullYear());

	$('#asstloader').hide();
}

$('#get_augmentation_assistanceyear').keydown(function(e){
	if(e.keyCode == 13){
	    if($('#get_augmentation_assistanceyear').val() == ""){

	    	var edate = new Date();
			get_reliefassistance_report(edate.getFullYear());

	    }else{

	    	var thisval = $('#get_augmentation_assistanceyear').val();
	    	get_reliefassistance_report(thisval);

	    }

	    $('#asstloader').show();
	}
})

function get_reliefassistance_report(yearss){

	$('#asstloader').show();

	$('#tbl_reliefassistance tbody').empty();

	var datas = {
		tyears : yearss
	}

	$.getJSON("/Pages/get_augmentation_assistance1",datas,function(a){


		var lgus = a.aug_data;

		var lguserved = 0;
		var lguservedo = 0;
		var famserved = 0;
		var famservedo = 0;
		var amountserved = 0;
		var fpackserved = 0;
		var amountservedo = 0;
		var fpackservedo = 0;

		var serveperlgu = 0;
		var amountserveperlgu = 0;

		var famserveperlgu = 0;
		var amtserveperlgu = 0;

		var fpacks = "Family Food Pack";

		for(var i in provinces){

			for(var qq in lgus){

				var plgu = lgus[qq].municipality_id;

				if(lgus[qq].provinceid == provinces[i].id){
					if(lgus[qq].asst_id == 1){
						if(qq == 0){
							if(plgu == lgus[qq].municipality_id){
								famserveperlgu = lgus[qq].number_served;
								amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
							}
						}else{
							if(plgu == lgus[qq].municipality_id){
								if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
									amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
								}else{
									famserveperlgu = famserveperlgu + lgus[qq].number_served;
									amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
								}
							}
						}
					}
				}
			}

			$('#tbl_reliefassistance tbody').append(
				"<tr style='cursor:pointer; background-color:#34A853; color:#000; font-weight:bold; font-size:16px'>"+
					"<td>"+provinces[i].name+"</td>"+
					"<td style='text-align:right'>"+addComma(famserveperlgu)+"</td>"+
					"<td style='text-align:right'>"+addComma(amtserveperlgu)+"</td>"+
					"<td></td>"+
					"<td></td>"+
					"<td></td>"+
				"</tr>"
			)
			for(var j in a.aug_data){
				if(a.aug_data[j].asst_id == 1){
					if(provinces[i].id == a.aug_data[j].provinceid){
						if(j == 0){

							var plgu = a.aug_data[0].municipality_id;

							

							for(var qq in lgus){
								if(lgus[qq].asst_id == 1){

									lguserved += 1;

									if(qq == 0){
										if(plgu == lgus[qq].municipality_id){
											famserveperlgu = lgus[qq].number_served;
											amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
										}
									}else{
										if(plgu == lgus[qq].municipality_id){
											if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
												amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
											}else{
												famserveperlgu = famserveperlgu + lgus[qq].number_served;
												amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
											}
										}
									}
								}
							}

							$('#tbl_reliefassistance tbody').append(
								"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
									"<td data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>       "+a.aug_data[j].municipality_name+"</td>"+
									"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
									"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
									"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'></td>"+
									"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'></td>"+
									"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'></td>"+
								"</tr>"
							)

							$('#tbl_reliefassistance tbody').append(
								"<tr style='cursor:pointer'>"+
									"<td data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>       </td>"+
									"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].number_served+"</td>"+
									"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(Number(a.aug_data[j].cost) * Number(a.aug_data[j].quantity))+"</td>"+
									"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].assistance_name+"</td>"+
									"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].quantity+"</td>"+
									"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+todate(a.aug_data[j].date_augmented)+"</td>"+
								"</tr>"
							)
							famserved = famserved + a.aug_data[j].number_served;
							famserveperlgu = 0;
							amtserveperlgu = 0;
						}else{
							if(a.aug_data[j].municipality_id == a.aug_data[j-1].municipality_id){
								if((a.aug_data[j].municipality_id == a.aug_data[j-1].municipality_id) && (a.aug_data[j].number_served == a.aug_data[j-1].number_served) && (a.aug_data[j].date_augmented == a.aug_data[j-1].date_augmented)){
									var serve = "";
								}else{

									var serve = a.aug_data[j].number_served;

									if(a.aug_data[j].provinceid < 6){
										lguserved = lguserved + 1;
										famserved = famserved + a.aug_data[j].number_served;
									}else{
										if(a.aug_data[j].provinceid > 5){
											if(a.aug_data[j].municipality_id != a.aug_data[j-1].municipality_id){
												lguservedo = lguservedo + 1;
											}
											famservedo = famservedo + a.aug_data[j].number_served;
										}
									}

								}

								$('#tbl_reliefassistance tbody').append(
									"<tr style='cursor:pointer'>"+
										"<td data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"' style='color:#fff'>       "+a.aug_data[j].municipality_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+serve+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(Number(a.aug_data[j].cost) * Number(a.aug_data[j].quantity))+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].assistance_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].quantity+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+todate(a.aug_data[j].date_augmented)+"</td>"+
									"</tr>"
								)
							}else{

								famserveperlgu = 0;
								amtserveperlgu = 0;

								if(a.aug_data[j].provinceid < 6){
									lguserved = lguserved + 1;
									famserved = famserved + a.aug_data[j].number_served;
								}else{
									if(a.aug_data[j].provinceid > 5){
										if(a.aug_data[j].municipality_id != a.aug_data[j-1].municipality_id){
											lguservedo = lguservedo + 1;
										}
										famservedo = famservedo + a.aug_data[j].number_served;
									}
								}

								var plgu = a.aug_data[j].municipality_id;

								for(var qq in lgus){
									if(lgus[qq].asst_id == 1){
										if(qq == 0){
											if(plgu == lgus[qq].municipality_id){
												famserveperlgu = lgus[qq].number_served;
												amtserveperlgu = Number(a.aug_data[j].cost) * Number(a.aug_data[j].quantity);
											}
										}else{
											if(plgu == lgus[qq].municipality_id){
												if((lgus[qq].municipality_id == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
												}else{
													famserveperlgu = famserveperlgu + lgus[qq].number_served;
													
												}
												amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
											}
										}
									}
								}

								$('#tbl_reliefassistance tbody').append(
									"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
										"<td data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>       "+a.aug_data[j].municipality_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'></td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'></td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'></td>"+
									"</tr>"
								)

								$('#tbl_reliefassistance tbody').append(
									"<tr style='cursor:pointer'>"+
										"<td data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>       </td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].number_served+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+addComma(Number(a.aug_data[j].cost) * Number(a.aug_data[j].quantity))+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].assistance_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+a.aug_data[j].quantity+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a.aug_data[j].remarks_particulars+"'>"+todate(a.aug_data[j].date_augmented)+"</td>"+
									"</tr>"
								)

								famserveperlgu = 0;
								amtserveperlgu = 0;

							}
						}

						if(a.aug_data[j].provinceid < 6){

							amountserved = amountserved + (Number(a.aug_data[j].cost) * Number(a.aug_data[j].quantity));
							if(a.aug_data[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
								fpackserved = fpackserved + a.aug_data[j].quantity;
							}
							
						}else{
							if(a.aug_data[j].provinceid > 5){
								amountservedo = amountservedo + (Number(a.aug_data[j].cost) * Number(a.aug_data[j].quantity));
								if(a.aug_data[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
									fpackservedo = fpackservedo + a.aug_data[j].quantity;
								}
							}
						}
					}
				}
			}
		}

		$('#lguserved').text(addComma(a.all_munis[0].all_munis));
		$('#lguservedo').text(addComma(lguservedo));
		$('#famserved').text(addComma(famserved));
		$('#famservedo').text(addComma(famservedo));
		$('#amountserved').text(addComma(amountserved));
		$('#fpackserved').text(addComma(fpackserved));
		$('#amountservedo').text(addComma(amountservedo));
		$('#fpackservedo').text(addComma(fpackservedo));

		$('#sum_famserved_aug').text(addComma(famserved));
		$('#sum_lguserved_aug').text(addComma(lguserved));
		$('#sum_amount_aug').text(addCommaMoney(amountserved));

		$('#sum_lguserved_aug_o').text(addComma(lguservedo));
		$('#sum_amount_aug_o').text(addCommaMoney(amountservedo));

		$('#gfamserved').text(famserved);
		$('#glguserved').text(lguserved);
		$('#gtotalamount').text(amountserved+amountservedo);

		$('[data-toggle="tooltip"]').tooltip();

	});

	setTimeout(function(){

		$('#tbl_ffwassistance tbody').empty();

		$.getJSON("/Pages/get_augmentation_assistanceffw",datas,function(a){

			var lgus = a;

			var lguserved = 0;
			var lguservedo = 0;
			var famserved = 0;
			var famservedo = 0;
			var amountserved = 0;
			var fpackserved = 0;
			var amountservedo = 0;
			var fpackservedo = 0;

			var serveperlgu = 0;
			var amountserveperlgu = 0;

			var famserveperlgu = 0;
			var amtserveperlgu = 0;

			var fpacks = "Family Food Pack";

			for(var i in provinces){

				for(var qq in lgus){

					var plgu = lgus[qq].municipality_id;

					if(lgus[qq].provinceid == provinces[i].id){
						if(lgus[qq].asst_id == 2){
							if(qq == 0){
								if(plgu == lgus[qq].municipality_id){
									famserveperlgu = lgus[qq].number_served;
									amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
								}
							}else{
								if(plgu == lgus[qq].municipality_id){
									if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
										amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
									}else{
										famserveperlgu = famserveperlgu + lgus[qq].number_served;
										amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
									}
								}
							}
						}
					}
				}

				$('#tbl_ffwassistance tbody').append(
					"<tr style='cursor:pointer; background-color:#34A853; color:#000; font-weight:bold; font-size:16px'>"+
						"<td>"+provinces[i].name+"</td>"+
						"<td style='text-align:right'>"+addComma(famserveperlgu)+"</td>"+
						"<td style='text-align:right'>"+addComma(amtserveperlgu)+"</td>"+
						"<td></td>"+
						"<td></td>"+
						"<td></td>"+
					"</tr>"
				)
				for(var j in a){
					if(a[j].asst_id == 2){
						if(provinces[i].id == a[j].provinceid){
							if(j == 0){

								var plgu = a[0].municipality_id;

								lguserved += 1;

								for(var qq in lgus){
									if(lgus[qq].asst_id == 2){
										if(qq == 0){
											if(plgu == lgus[qq].municipality_id){
												famserveperlgu = lgus[qq].number_served;
												amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
											}
										}else{
											if(plgu == lgus[qq].municipality_id){
												if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}else{
													famserveperlgu = famserveperlgu + lgus[qq].number_served;
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}
											}
										}
									}
								}

								$('#tbl_ffwassistance tbody').append(
									"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
										"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       "+a[j].municipality_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
									"</tr>"
								)

								$('#tbl_ffwassistance tbody').append(
									"<tr style='cursor:pointer'>"+
										"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       </td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].number_served+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].quantity+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
									"</tr>"
								)
								famserved = famserved + a[j].number_served;
								famserveperlgu = 0;
								amtserveperlgu = 0;
							}else{
								if(a[j].municipality_id == a[j-1].municipality_id){
									if((a[j].municipality_id == a[j-1].municipality_id) && (a[j].number_served == a[j-1].number_served) && (a[j].date_augmented == a[j-1].date_augmented)){
										var serve = "";
									}else{

										var serve = a[j].number_served;

										if(a[j].provinceid < 6){
											lguserved = lguserved + 1;
											famserved = famserved + a[j].number_served;
										}else{
											if(a[j].provinceid > 5){
												if(a[j].municipality_id != a[j-1].municipality_id){
													lguservedo = lguservedo + 1;
												}
												famservedo = famservedo + a[j].number_served;
											}
										}

									}

									$('#tbl_ffwassistance tbody').append(
										"<tr style='cursor:pointer'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"' style='color:#fff'>       "+a[j].municipality_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+serve+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].quantity+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
										"</tr>"
									)
								}else{

									famserveperlgu = 0;
									amtserveperlgu = 0;

									if(a[j].provinceid < 6){
										lguserved = lguserved + 1;
										famserved = famserved + a[j].number_served;
									}else{
										if(a[j].provinceid > 5){
											if(a[j].municipality_id != a[j-1].municipality_id){
												lguservedo = lguservedo + 1;
											}
											famservedo = famservedo + a[j].number_served;
										}
									}

									var plgu = a[j].municipality_id;

									for(var qq in lgus){
										if(lgus[qq].asst_id == 2){
											if(qq == 0){
												if(plgu == lgus[qq].municipality_id){
													famserveperlgu = lgus[qq].number_served;
													amtserveperlgu = Number(a[j].cost) * Number(a[j].quantity);
												}
											}else{
												if(plgu == lgus[qq].municipality_id){
													if((lgus[qq].municipality_id == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
													}else{
														famserveperlgu = famserveperlgu + lgus[qq].number_served;
														
													}
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}
											}
										}
									}

									$('#tbl_ffwassistance tbody').append(
										"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       "+a[j].municipality_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"</tr>"
									)

									$('#tbl_ffwassistance tbody').append(
										"<tr style='cursor:pointer'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       </td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].number_served+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].quantity+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
										"</tr>"
									)

									famserveperlgu = 0;
									amtserveperlgu = 0;

								}
							}

							if(a[j].provinceid < 6){

								amountserved = amountserved + (Number(a[j].cost) * Number(a[j].quantity));
								if(a[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
									fpackserved = fpackserved + a[j].quantity;
								}
								
							}else{
								if(a[j].provinceid > 5){
									amountservedo = amountservedo + (Number(a[j].cost) * Number(a[j].quantity));
									if(a[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
										fpackservedo = fpackservedo + a[j].quantity;
									}
								}
							}
						}
					}
				}
			}

			$('#ffwlguserved').text(addComma(lguserved));
			$('#ffwfamserved').text(addComma(famserved));
			$('#ffwamountserved').text(addComma(amountserved));
			$('#ffwfpackserved').text(addComma(fpackserved));

			$('#sum_famserved_ffw').text(addComma(famserved));
			$('#sum_lguserved_ffw').text(addComma(lguserved));
			$('#sum_amount_ffw').text(addCommaMoney(amountserved));

			var gfamserved = $('#gfamserved').text();
			gfamserved = Number(gfamserved) + Number(famserved);
			$('#gfamserved').text(gfamserved);

			var glguserved = $('#glguserved').text();
			glguserved = Number(glguserved) + Number(lguserved);
			$('#glguserved').text(glguserved);

			var gtotalamount = $('#gtotalamount').text();
			gtotalamount = Number(gtotalamount) + Number(amountserved);
			$('#gtotalamount').text(gtotalamount);

			$('[data-toggle="tooltip"]').tooltip();

		});
	},1500);
	

	setTimeout(function(){

		$('#tbl_esaassistance tbody').empty();

		$.getJSON("/Pages/get_augmentation_assistanceesa",datas,function(a){

			var lgus = a;

			var lguserved = 0;
			var lguservedo = 0;
			var famserved = 0;
			var famservedo = 0;
			var amountserved = 0;
			var fpackserved = 0;
			var amountservedo = 0;
			var fpackservedo = 0;

			var serveperlgu = 0;
			var amountserveperlgu = 0;

			var famserveperlgu = 0;
			var amtserveperlgu = 0;

			var fpacks = "Family Food Pack";

			for(var i in provinces){

				for(var qq in lgus){

					var plgu = lgus[qq].municipality_id;

					if(lgus[qq].provinceid == provinces[i].id){
						if(lgus[qq].asst_id == 5 || lgus[qq].asst_id == 6){
							if(qq == 0){
								if(plgu == lgus[qq].municipality_id){
									famserveperlgu = lgus[qq].number_served;
									amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
								}
							}else{
								if(plgu == lgus[qq].municipality_id){
									if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
										amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
									}else{
										famserveperlgu = famserveperlgu + lgus[qq].number_served;
										amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
									}
								}
							}
						}
					}
				}

				$('#tbl_esaassistance tbody').append(
					"<tr style='cursor:pointer; background-color:#34A853; color:#000; font-weight:bold; font-size:16px'>"+
						"<td>"+provinces[i].name+"</td>"+
						"<td style='text-align:right'>"+addComma(famserveperlgu)+"</td>"+
						"<td style='text-align:right'>"+addComma(amtserveperlgu)+"</td>"+
						"<td></td>"+
						"<td></td>"+
					"</tr>"
				)
				for(var j in a){
					if(a[j].asst_id == 5 || a[j].asst_id == 6){
						if(provinces[i].id == a[j].provinceid){
							if(j == 0){

								var plgu = a[0].municipality_id;

								lguserved += 1;

								for(var qq in lgus){
									if(lgus[qq].asst_id == 5 || lgus[qq].asst_id == 6){
										if(qq == 0){
											if(plgu == lgus[qq].municipality_id){
												famserveperlgu = lgus[qq].number_served;
												amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
											}
										}else{
											if(plgu == lgus[qq].municipality_id){
												if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}else{
													famserveperlgu = famserveperlgu + lgus[qq].number_served;
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}
											}
										}
									}
								}

								$('#tbl_esaassistance tbody').append(
									"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
										"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       "+a[j].municipality_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
									"</tr>"
								)

								$('#tbl_esaassistance tbody').append(
									"<tr style='cursor:pointer'>"+
										"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       </td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(a[j].number_served)+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
									"</tr>"
								)

								famserved = famserved + a[j].number_served;
								famserveperlgu = 0;
								amtserveperlgu = 0;

							}else{
								if(a[j].municipality_id == a[j-1].municipality_id){
									if((a[j].municipality_id == a[j-1].municipality_id) && (a[j].number_served == a[j-1].number_served) && (a[j].date_augmented == a[j-1].date_augmented)){
										var serve = "";
									}else{

										var serve = a[j].number_served;

										if(a[j].provinceid < 6){
											famserved = famserved + a[j].number_served;
										}
									}

									$('#tbl_esaassistance tbody').append(
										"<tr style='cursor:pointer'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"' style='color:#fff'>       "+a[j].municipality_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(serve)+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
										"</tr>"
									)
								}else{

									famserveperlgu = 0;
									amtserveperlgu = 0;

									if(a[j].provinceid < 6){
										lguserved = lguserved + 1;
										famserved = famserved + a[j].number_served;
									}

									var plgu = a[j].municipality_id;

									for(var qq in lgus){
										if(lgus[qq].asst_id == 5 || lgus[qq].asst_id == 6){
											if(qq == 0){
												if(plgu == lgus[qq].municipality_id){
													famserveperlgu = lgus[qq].number_served;
													amtserveperlgu = Number(a[j].cost) * Number(a[j].quantity);
												}
											}else{
												if(plgu == lgus[qq].municipality_id){
													if((lgus[qq].municipality_id == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
													}else{
														famserveperlgu = famserveperlgu + lgus[qq].number_served;
														
													}
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}
											}
										}
									}

									$('#tbl_esaassistance tbody').append(
										"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       "+a[j].municipality_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"</tr>"
									)

									$('#tbl_esaassistance tbody').append(
										"<tr style='cursor:pointer'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       </td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].number_served+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
										"</tr>"
									)

									famserveperlgu = 0;
									amtserveperlgu = 0;

								}
							}

							if(a[j].provinceid < 6){

								amountserved = amountserved + (Number(a[j].cost) * Number(a[j].quantity));
								if(a[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
									fpackserved = fpackserved + a[j].quantity;
								}
								
							}else{
								if(a[j].provinceid > 5){
									amountservedo = amountservedo + (Number(a[j].cost) * Number(a[j].quantity));
									if(a[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
										fpackservedo = fpackservedo + a[j].quantity;
									}
								}
							}
						}
					}
				}
			}

			$('#esalguserved').text(addComma(lguserved));
			$('#esafamserved').text(addComma(famserved));
			$('#esaamountserved').text(addComma(amountserved));

			$('#sum_famserved_esa').text(addComma(famserved));
			$('#sum_lguserved_esa').text(addComma(lguserved));
			$('#sum_amount_esa').text(addCommaMoney(amountserved));

			var gfamserved = $('#gfamserved').text();
			gfamserved = Number(gfamserved) + Number(famserved);
			$('#gfamserved').text(gfamserved);

			var glguserved = $('#glguserved').text();
			glguserved = Number(glguserved) + Number(lguserved);
			$('#glguserved').text(glguserved);

			var gtotalamount = $('#gtotalamount').text();
			gtotalamount = Number(gtotalamount) + Number(amountserved);
			$('#gtotalamount').text(gtotalamount);

			$('[data-toggle="tooltip"]').tooltip();

		});
	},2500);

	setTimeout(function(){
		$('#tbl_cfwassistance tbody').empty();

		$.getJSON("/Pages/get_augmentation_assistancecfw",datas,function(a){

			var lgus = a;

			var lguserved = 0;
			var lguservedo = 0;
			var famserved = 0;
			var famservedo = 0;
			var amountserved = 0;
			var fpackserved = 0;
			var amountservedo = 0;
			var fpackservedo = 0;

			var serveperlgu = 0;
			var amountserveperlgu = 0;

			var famserveperlgu = 0;
			var amtserveperlgu = 0;

			var fpacks = "Family Food Pack";

			for(var i in provinces){

				for(var qq in lgus){

					var plgu = lgus[qq].municipality_id;

					if(lgus[qq].provinceid == provinces[i].id){
						if(lgus[qq].asst_id == 3 || lgus[qq].asst_id == 4){
							if(qq == 0){
								if(plgu == lgus[qq].municipality_id){
									famserveperlgu = lgus[qq].number_served;
									amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
								}
							}else{
								if(plgu == lgus[qq].municipality_id){
									if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
										amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
									}else{
										famserveperlgu = famserveperlgu + lgus[qq].number_served;
										amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
									}
								}
							}
						}
					}
				}

				$('#tbl_cfwassistance tbody').append(
					"<tr style='cursor:pointer; background-color:#34A853; color:#000; font-weight:bold; font-size:16px'>"+
						"<td>"+provinces[i].name+"</td>"+
						"<td style='text-align:right'>"+addComma(famserveperlgu)+"</td>"+
						"<td style='text-align:right'>"+addComma(amtserveperlgu)+"</td>"+
						"<td></td>"+
						"<td></td>"+
					"</tr>"
				)
				for(var j in a){
					if(a[j].asst_id == 3 || a[j].asst_id == 4){
						if(provinces[i].id == a[j].provinceid){
							if(j == 0){

								var plgu = a[0].municipality_id;

								lguserved += 1;

								for(var qq in lgus){
									if(lgus[qq].asst_id == 3 || lgus[qq].asst_id == 4){
										if(qq == 0){
											if(plgu == lgus[qq].municipality_id){
												famserveperlgu = lgus[qq].number_served;
												amtserveperlgu = Number(lgus[qq].cost) * Number(lgus[qq].quantity);
											}
										}else{
											if(plgu == lgus[qq].municipality_id){
												if((plgu == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}else{
													famserveperlgu = famserveperlgu + lgus[qq].number_served;
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}
											}
										}
									}
								}

								$('#tbl_cfwassistance tbody').append(
									"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
										"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       "+a[j].municipality_name+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
									"</tr>"
								)

								$('#tbl_cfwassistance tbody').append(
									"<tr style='cursor:pointer'>"+
										"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       </td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(a[j].number_served)+"</td>"+
										"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
										"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
									"</tr>"
								)

								famserved = famserved + a[j].number_served;
								famserveperlgu = 0;
								amtserveperlgu = 0;

							}else{
								if(a[j].municipality_id == a[j-1].municipality_id){
									if((a[j].municipality_id == a[j-1].municipality_id) && (a[j].number_served == a[j-1].number_served) && (a[j].date_augmented == a[j-1].date_augmented)){
										var serve = "";
									}else{

										var serve = a[j].number_served;

										if(a[j].provinceid < 6){
											famserved = famserved + a[j].number_served;
										}
									}

									$('#tbl_cfwassistance tbody').append(
										"<tr style='cursor:pointer'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"' style='color:#fff'>       "+a[j].municipality_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(serve)+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
										"</tr>"
									)
								}else{

									famserveperlgu = 0;
									amtserveperlgu = 0;

									if(a[j].provinceid < 6){
										lguserved = lguserved + 1;
										famserved = famserved + a[j].number_served;
									}

									var plgu = a[j].municipality_id;

									for(var qq in lgus){
										if(lgus[qq].asst_id == 3 || lgus[qq].asst_id == 4){
											if(qq == 0){
												if(plgu == lgus[qq].municipality_id){
													famserveperlgu = lgus[qq].number_served;
													amtserveperlgu = Number(a[j].cost) * Number(a[j].quantity);
												}
											}else{
												if(plgu == lgus[qq].municipality_id){
													if((lgus[qq].municipality_id == lgus[qq-1].municipality_id) && (lgus[qq].number_served == lgus[qq-1].number_served) && (lgus[qq].date_augmented == lgus[qq-1].date_augmented)){
													}else{
														famserveperlgu = famserveperlgu + lgus[qq].number_served;
														
													}
													amtserveperlgu = amtserveperlgu + (Number(lgus[qq].cost) * Number(lgus[qq].quantity));
												}
											}
										}
									}

									$('#tbl_cfwassistance tbody').append(
										"<tr style='cursor:pointer; font-weight:bold; font-size:15px; background-color:#7AB900; color: #000'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       "+a[j].municipality_name+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(famserveperlgu)+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(amtserveperlgu)+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'></td>"+
										"</tr>"
									)

									$('#tbl_cfwassistance tbody').append(
										"<tr style='cursor:pointer'>"+
											"<td data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>       </td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].number_served+"</td>"+
											"<td style='text-align:right' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+addComma(Number(a[j].cost) * Number(a[j].quantity))+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+a[j].assistance_name+"</td>"+
											"<td style='text-align:center' data-toggle='tooltip' title='"+a[j].remarks_particulars+"'>"+todate(a[j].date_augmented)+"</td>"+
										"</tr>"
									)

									famserveperlgu = 0;
									amtserveperlgu = 0;

								}
							}

							if(a[j].provinceid < 6){

								amountserved = amountserved + (Number(a[j].cost) * Number(a[j].quantity));
								if(a[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
									fpackserved = fpackserved + a[j].quantity;
								}
								
							}else{
								if(a[j].provinceid > 5){
									amountservedo = amountservedo + (Number(a[j].cost) * Number(a[j].quantity));
									if(a[j].assistance_name.toLowerCase() == fpacks.toLowerCase()){
										fpackservedo = fpackservedo + a[j].quantity;
									}
								}
							}
						}
					}
				}
			}

			$('#cfwlguserved').text(addComma(lguserved));
			$('#cfwfamserved').text(addComma(famserved));
			$('#cfwamountserved').text(addComma(amountserved));

			$('#sum_famserved_cfw').text(addComma(famserved));
			$('#sum_lguserved_cfw').text(addComma(lguserved));
			$('#sum_amount_cfw').text(addCommaMoney(amountserved));

			var gfamserved = $('#gfamserved').text();
			gfamserved = Number(gfamserved) + Number(famserved);
			$('#gfamserved').text(addComma(gfamserved));

			var glguserved = $('#glguserved').text();
			glguserved = Number(glguserved) + Number(lguserved);
			$('#glguserved').text(addComma(glguserved));

			var gtotalamount = $('#gtotalamount').text();
			gtotalamount = Number(gtotalamount) + Number(amountserved);
			$('#gtotalamount').text(addCommaMoney(gtotalamount));

			// console.log(gtotalamount);

			$('[data-toggle="tooltip"]').tooltip();

		});


		$.getJSON("/Pages/get_unique_lgus",datas,function(a){
			$('#glguservedu').text(addComma(a[0].count));
		});

	},3500)

	


	setTimeout(function(){

		var nserve = 0;
		var namount = 0;
		var fpacks = 0;
		var nfpacks = 0;
		var nfipacks = 0;

		$('#tbl_assistanceperdisaster tbody').empty();

		$.getJSON("/Pages/get_augmentation_assistanceperd",datas,function(a){

			var aug_types = [
				{
					code 	: "aug",
					name 	: "Augmentation Assistance"
				},
				{
					code 	: "aug_ffw",
					name 	: "Food-for-Work"
				},
				{
					code 	: "cfw",
					name 	: "Cash-for-Work"
				},
				{
					code 	: "esatot",
					name 	: "Emergency Shelter Assistance - Totally Damaged"
				},
				{
					code 	: "esapart",
					name 	: "Emergency Shelter Assistance - Partially Damaged"
				}
			];	

			for(var i in a.perd){

				var tnserve = 0;
				var tnamount = 0;

				for(var kk in a.asst){
					if(a.perd[i].disaster_event == a.asst[kk].disaster_event){
						if(kk == 0){
							tnserve = Number(a.asst[kk].number_served);
						}else{

							if(a.asst[kk-1].municipality_id == a.asst[kk].municipality_id){
								if((a.asst[kk-1].number_served == a.asst[kk].number_served) && (a.asst[kk-1].date_augmented == a.asst[kk].date_augmented)){
								}else{
									tnserve += Number(a.asst[kk].number_served);
								}
							}else{
								if((a.asst[kk-1].number_served == a.asst[kk].number_served) && (a.asst[kk-1].date_augmented == a.asst[kk].date_augmented)){
								}else{
									tnserve += Number(a.asst[kk].number_served);
								}
							}
						}

						tnamount += Number(a.asst[kk].quantity) * Number(a.asst[kk].cost);

					}
				}

				nserve += tnserve; 


				$('#tbl_assistanceperdisaster tbody').append(

					"<tr style='font-weight: bold'>"+
						"<td style='border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+a.perd[i].disaster_name+ " <sup>"+ todate(a.perd[i].disaster_date) + "</sup></td>"+
						"<td style='text-align:center; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
						"<td style='text-align:center; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
						"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+addComma(tnserve)+"</td>"+
						"<td style='text-align:center; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
						"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
						"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
						"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+addCommaMoney(tnamount)+"</td>"+
					"</tr>"

				);



					for(var k in a.asst){

						if(k == 0){

							if(a.perd[i].disaster_event == a.asst[k].disaster_event){

								if(a.asst[k].augment_list_code == 'aug'){
									var string = "Augmentation Assistance";
								}else if(a.asst[k].augment_list_code == 'aug_ffw'){
									var string = "Food-for-Work";
								}else if(a.asst[k].augment_list_code == 'cfwtot' || a.asst[k].augment_list_code == 'cfwpart'){
									var string = "Cash-for-Work";
								}else if(a.asst[k].augment_list_code == 'esatot' || a.asst[k].augment_list_code == 'esapart'){
									var string = "Emergency Shelter Assistance";
								}

								var amt = Number(a.asst[k].quantity) * Number(a.asst[k].cost);

								//nserve = Number(a.asst[k].number_served);
								namount += amt;

								var strpacks = a.asst[k].assistance_name.toLowerCase();

								if(strpacks.includes("family food pack")){
									fpacks += a.asst[k].quantity;
									nfpacks += Number(a.asst[k].quantity) * Number(a.asst[k].cost);
								}else{
									nfipacks += Number(a.asst[k].quantity) * Number(a.asst[k].cost);
								}


								$('#tbl_assistanceperdisaster tbody').append(

									"<tr>"+
										"<td style='border: 1px solid #000'></td>"+
										"<td style='text-align:center; border: 1px solid #000'>"+string+"</td>"+
										"<td style='text-align:center; border: 1px solid #000'>"+a.asst[k].municipality_name+", "+a.asst[k].province_name+"</td>"+
										"<td style='text-align:right; border: 1px solid #000'>"+isnullperd(a.asst[k].number_served)+"</td>"+
										"<td style='text-align:center; border: 1px solid #000'>"+a.asst[k].assistance_name+"</td>"+
										"<td style='text-align:right; border: 1px solid #000'>"+addComma(a.asst[k].quantity)+"</td>"+
										"<td style='text-align:center; border: 1px solid #000'>"+todate(a.asst[k].date_augmented)+"</td>"+
										"<td style='text-align:right; border: 1px solid #000'>"+addCommaMoney(amt)+"</td>"+
									"</tr>"

								);	

								namount = 0;

							}

						}else{

							if(a.asst[k-1].municipality_id == a.asst[k].municipality_id){

								if((a.asst[k-1].number_served == a.asst[k].number_served) && (a.asst[k-1].date_augmented == a.asst[k].date_augmented)){
									var served =  "";
								}else{
									var served =  a.asst[k].number_served;
									//nserve += Number(a.asst[k].number_served);

								}

								if(a.perd[i].disaster_event == a.asst[k].disaster_event){

									if(a.asst[k].augment_list_code == 'aug'){
										var string = "Augmentation Assistance";
									}else if(a.asst[k].augment_list_code == 'aug_ffw'){
										var string = "Food-for-Work";
									}else if(a.asst[k].augment_list_code == 'cfwtot' || a.asst[k].augment_list_code == 'cfwpart'){
										var string = "Cash-for-Work";
									}else if(a.asst[k].augment_list_code == 'esatot' || a.asst[k].augment_list_code == 'esapart'){
										var string = "Emergency Shelter Assistance";
									}

									var amt = Number(a.asst[k].quantity) * Number(a.asst[k].cost);
									namount += amt;

									var strpacks = a.asst[k].assistance_name.toLowerCase();

									if(strpacks.includes("family food pack")){
										fpacks += a.asst[k].quantity;
										nfpacks += Number(a.asst[k].quantity) * Number(a.asst[k].cost);
									}else{
										nfipacks += Number(a.asst[k].quantity) * Number(a.asst[k].cost);
									}

									$('#tbl_assistanceperdisaster tbody').append(

										"<tr>"+
											"<td style='border: 1px solid #000'></td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+string+"</td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+a.asst[k].municipality_name+", "+a.asst[k].province_name+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+isnullperd(served)+"</td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+a.asst[k].assistance_name+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+addComma(a.asst[k].quantity)+"</td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+todate(a.asst[k].date_augmented)+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+addCommaMoney(amt)+"</td>"+
										"</tr>"

									);	

									namount = 0;

								}

								

							}else{

								if((a.asst[k-1].number_served == a.asst[k].number_served) && (a.asst[k-1].date_augmented == a.asst[k].date_augmented)){
									var served =  "";
								}else{
									var served =  a.asst[k].number_served;
									//nserve += Number(a.asst[k].number_served);
								}

								if(a.perd[i].disaster_event == a.asst[k].disaster_event){

									if(a.asst[k].augment_list_code == 'aug'){
										var string = "Augmentation Assistance";
									}else if(a.asst[k].augment_list_code == 'aug_ffw'){
										var string = "Food-for-Work";
									}else if(a.asst[k].augment_list_code == 'cfwtot' || a.asst[k].augment_list_code == 'cfwpart'){
										var string = "Cash-for-Work";
									}else if(a.asst[k].augment_list_code == 'esatot' || a.asst[k].augment_list_code == 'esapart'){
										var string = "Emergency Shelter Assistance";
									}

									var strpacks = a.asst[k].assistance_name.toLowerCase();

									if(strpacks.includes("family food pack")){
										fpacks += a.asst[k].quantity;
										nfpacks += Number(a.asst[k].quantity) * Number(a.asst[k].cost);
									}else{
										nfipacks += Number(a.asst[k].quantity) * Number(a.asst[k].cost);
									}

									var amt = Number(a.asst[k].quantity) * Number(a.asst[k].cost);
									namount += amt;

									$('#tbl_assistanceperdisaster tbody').append(

										"<tr>"+
											"<td style='border: 1px solid #000'></td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+string+"</td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+a.asst[k].municipality_name+", "+a.asst[k].province_name+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+isnullperd(served)+"</td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+a.asst[k].assistance_name+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+addComma(a.asst[k].quantity)+"</td>"+
											"<td style='text-align:center; border: 1px solid #000'>"+todate(a.asst[k].date_augmented)+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+addCommaMoney(amt)+"</td>"+
										"</tr>"

									);	

									namount = 0;

								}

							}


						}

					}
			}

				$('#tbl_assistanceperdisaster tbody').append(

					"<tr style='font-weight: bold; font-size: 15px; border: 1px solid #000'>"+
						"<td style='background-color: #D8D8D8; color: #000; border: 1px solid #000' colspan='5'>TOTAL Family Food Packs <sup>(# of Food Packs and Amount)</sup></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'>"+addComma(fpacks)+"</td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'>"+addCommaMoney(nfpacks)+"</td>"+
					"</tr>"

				);

				$('#tbl_assistanceperdisaster tbody').append(

					"<tr style='font-weight: bold; font-size: 15px'>"+
						"<td style='background-color: #D8D8D8; color: #000; border: 1px solid #000' colspan='7'>TOTAL Food and Non-Food Items <sup>(Amount)</sup></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'>"+addCommaMoney(nfipacks)+"</td>"+
					"</tr>"

				);

				$('#tbl_assistanceperdisaster tbody').append(

					"<tr style='font-weight: bold; font-size: 15px'>"+
						"<td style='background-color: #D8D8D8; color: #000; border: 1px solid #000' colspan='3'>TOTAL <sup> (Families Served and Amount) </sup></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'>"+addComma(nserve)+"</td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000' colspan='3'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						// "<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'></td>"+
						"<td style='text-align:right; background-color: #D8D8D8; color: #000; border: 1px solid #000'>"+addCommaMoney(namount)+"</td>"+
					"</tr>"

				);

				$('#tbl_assistanceperdisastercons tbody').empty();

				var allserve = 0;
				var allamount = 0;

				for(var i in a.perd){

					var tnserve = 0;
					var tnamount = 0;

					for(var kk in a.asst){
						if(a.perd[i].disaster_event == a.asst[kk].disaster_event){
							if(kk == 0){
								tnserve = Number(a.asst[kk].number_served);
							}else{

								if(a.asst[kk-1].municipality_id == a.asst[kk].municipality_id){
									if((a.asst[kk-1].number_served == a.asst[kk].number_served) && (a.asst[kk-1].date_augmented == a.asst[kk].date_augmented)){
									}else{
										tnserve += Number(a.asst[kk].number_served);
									}
								}else{
									if((a.asst[kk-1].number_served == a.asst[kk].number_served) && (a.asst[kk-1].date_augmented == a.asst[kk].date_augmented)){
									}else{
										tnserve += Number(a.asst[kk].number_served);
									}
								}
							}

							tnamount += Number(a.asst[kk].quantity) * Number(a.asst[kk].cost);

						}
					}

					allserve += tnserve;
					allamount += tnamount;

					$('#tbl_assistanceperdisastercons tbody').append(

						"<tr style='font-weight: bold'>"+
							"<td style='border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+a.perd[i].disaster_name+ " <sup>"+ todate(a.perd[i].disaster_date) + "</sup></td>"+
							"<td style='text-align:center; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
							"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+addComma(tnserve)+"</td>"+
							"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+addCommaMoney(tnamount)+"</td>"+
						"</tr>"

					);

					for(var q in aug_types){


						var amserves = 0;
						var amamount = 0;


						for(var zz in a.asst){

							if(a.asst[zz].disaster_event == a.perd[i].disaster_event){


								if(zz == 0){
									if((a.asst[zz].augment_list_code == aug_types[q].code)){
										amserves = Number(a.asst[zz].number_served);
									}
								}else{

										if((a.asst[zz].augment_list_code == aug_types[q].code)){
											if(a.asst[zz-1].municipality_id == a.asst[zz].municipality_id){
												if((a.asst[zz-1].number_served == a.asst[zz].number_served) && (a.asst[zz-1].date_augmented == a.asst[zz].date_augmented)){
												}else{
													amserves += Number(a.asst[zz].number_served);
												}
											}else{
												if((a.asst[zz-1].number_served == a.asst[zz].number_served) && (a.asst[zz-1].date_augmented == a.asst[zz].date_augmented)){
												}else{
													amserves += Number(a.asst[zz].number_served);
												}
											}
										}

								}

								if((a.asst[zz].augment_list_code == aug_types[q].code)){
									amamount += Number(a.asst[zz].quantity) * Number(a.asst[zz].cost);
								}

							}

						}
					
						$('#tbl_assistanceperdisastercons tbody').append(

							"<tr style='font-weight: bold'>"+
								"<td style='border: 1px solid #000; background-color: #EEEEEE; color: #000'>       "+aug_types[q].name+"</td>"+
								"<td style='text-align:center; border: 1px solid #000; background-color: #EEEEEE; color: #000'></td>"+
								"<td style='text-align:right; border: 1px solid #000; background-color: #EEEEEE; color: #000'>"+addComma(amserves)+"</td>"+
								"<td style='text-align:right; border: 1px solid #000; background-color: #EEEEEE; color: #000'>"+addCommaMoney(amamount)+"</td>"+
							"</tr>"

						);

						amamount = 0;

						for(var m in a.muni){

							var mserves = 0;
							var mamount = 0;
							

							if(a.muni[m].disaster_event == a.perd[i].disaster_event){

								if(a.muni[m].augment_list_code == aug_types[q].code){

									for(var yy in a.asst){


										if(yy == 0){
											if((a.muni[m].municipality_id == a.asst[yy].municipality_id) && (a.asst[yy].augment_list_code == aug_types[q].code) && (a.muni[m].disaster_event == a.asst[yy].disaster_event)){
												mserves = Number(a.asst[yy].number_served);
												mamount += Number(a.asst[yy].quantity) * Number(a.asst[yy].cost);
											}
										}else{

												if((a.muni[m].municipality_id == a.asst[yy].municipality_id) && (a.asst[yy].augment_list_code == aug_types[q].code) && (a.muni[m].disaster_event == a.asst[yy].disaster_event)){
													if(a.asst[yy-1].municipality_id == a.asst[yy].municipality_id){
														if((a.asst[yy-1].number_served == a.asst[yy].number_served) && (a.asst[yy-1].date_augmented == a.asst[yy].date_augmented)){
															mamount += Number(a.asst[yy].quantity) * Number(a.asst[yy].cost);
														}else{
															mserves += Number(a.asst[yy].number_served);
															mamount += Number(a.asst[yy].quantity) * Number(a.asst[yy].cost);
														}
													}else{
														if((a.asst[yy-1].number_served == a.asst[yy].number_served) && (a.asst[yy-1].date_augmented == a.asst[yy].date_augmented)){
															mamount += Number(a.asst[yy].quantity) * Number(a.asst[yy].cost);
														}else{
															mserves += Number(a.asst[yy].number_served);
															mamount += Number(a.asst[yy].quantity) * Number(a.asst[yy].cost);
														}
													}
												}


										}

										

									}

									$('#tbl_assistanceperdisastercons tbody').append(

										"<tr style='font-weight: bold'>"+
											"<td style='border: 1px solid #000'></td>"+
											"<td style='text-align:left; border: 1px solid #000'>   "+a.muni[m].municipality_name+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+addComma(mserves)+"</td>"+
											"<td style='text-align:right; border: 1px solid #000'>"+addCommaMoney(mamount)+"</td>"+
										"</tr>"

									);



								}

							}

							mamount = 0;

						}


					}


				}

				$('#tbl_assistanceperdisastercons tbody').append(

					"<tr style='font-weight: bold'>"+
						"<td style='border: 1px solid #000; background-color: #D8D8D8; color: #000'><b>TOTAL</b></td>"+
						"<td style='text-align:center; border: 1px solid #000; background-color: #D8D8D8; color: #000'></td>"+
						"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+addComma(allserve)+"</td>"+
						"<td style='text-align:right; border: 1px solid #000; background-color: #D8D8D8; color: #000'>"+addCommaMoney(allamount)+"</td>"+
					"</tr>"

				);


				$('#asstloader').hide();

				// $('#tbl_assistanceperdisaster').DataTable();

		});

		

	},4500)



}

$('#ecplaceorigin').keyup(function(){
	if($('#ecname').val() == ""){
		$('#ecplaceorigin').val('');
	}
})

$('#ecplaceorigin').change(function(){

	$('#ecplaceorigin1').val($('#ecplaceorigin option:selected').text());

})

$('#ecinow').keyup(function(){
	if($('#ecinow').val() == "" || $('#ecinow').val() == 0){
		$('#ecistatus').val("Closed");

		$('#ecfamnow').val(0);
		$('#ecpernow').val(0);

	}else{
		if(ecstatus == "Closed" && $('#ecinow').val() != 0){
			$('#ecistatus').val("Re-activated");
		}else{
			$('#ecistatus').val(ecstatus);
		}
	}
})

var bub_count_issues = $('#bub_count_issues');

if(bub_count_issues.length){
	// issuesfound();
}

// function issuesfound(){

// 	var datas = {
// 		id : URLID()
// 	};

// 	var bub_count = 0;
// 	$('#issuesfound').empty();
// 	$.getJSON("/Pages/issuesfound",datas,function(a){
// 		for(var i in a){
// 			if(a[i].person_cum > a[i].tot_population){
// 				bub_count = bub_count + 1;
// 				$('#issuesfound').append(
// 					"<li>"+
// 	                  "<a>"+
// 	                    "<span class='message'>"+
// 	                      "Affected Population in Brgy."+a[i].brgy_name+" exceeds its total population as of 2015"+
// 	                    "</span>"+
// 	                  "</a>"+
// 	                "</li>"
// 				)
// 			}
// 		}
// 		$('#bub_count_issues').empty().append(bub_count);
// 	});

// }


//reset selection of barangay when changing the selected value of city_dam_per_brgy
$('#city_dam_per_brgy').change(function(){

	var uriID = URLID();
	var cid = $('#city_dam_per_brgy').val();

	var datas = {
		uriID 	: uriID,
		cid 	: cid	
	};

	$('#brgy_dam_per_brgy').empty().append(
		"<option value=''>-- Select Barangay --</option>"
	);

	$.getJSON("/Pages/getAllOrigin",datas,function(a){

		for(var t in a){
			$('#brgy_dam_per_brgy').append(
				"<option value='"+a[t].id+"'>"+a[t].brgy_name+"</option>"
			);
		}

	});


	//reset data_dam_per_brgy_arr when changing city/municipality 
	data_dam_per_brgy_arr = [];
	populateDataDamagePerBrgy(data_dam_per_brgy_arr);
})

$('#close_edit_modal').click(function(){

	var datum = {
		username 	: $('#usernameid').text(),
		id 				: URLID()
	}

	$.getJSON("/Pages/get_can_edit",datum,function(a){
		if(a == 0){
			$('#savedata_dam_per_brgy').hide();
			$('#saveBrgytoArray').hide();
			$('#updatedata_dam_per_brgyv2').hide();
			$('#deldata_dam_per_brgyv2').hide();
		}else{
			$('#savedata_dam_per_brgy').show();
			$('#saveBrgytoArray').show();
			$('#updatedata_dam_per_brgyv2').show();
			$('#deldata_dam_per_brgyv2').show();
		}
	})
	$('#updatedata_dam_per_brgy').hide();
	$('#deldata_dam_per_brgy').hide();

	$('#province_dam_per_brgy').val('');
	$('#damperbrgy_totally').val('');
	$('#damperbrgy_partially').val('');

	$('#damperbrgy_tot_aff_fam').val('');
	$('#damperbrgy_tot_aff_person').val('');

	$('#damperbrgy_dead').val('');
	$('#damperbrgy_injured').val('');
	$('#damperbrgy_missing').val('');
	$('#city_dam_per_brgy').val('');
	$('#brgy_dam_per_brgy').val('');

	$('#costasst_brgy').val('');

})

//Allow multiple saving of affected barangays
let data_dam_per_brgy_arr = [];

function savedata_dam_per_brgyQ(){

	var uriID = URLID();

	if($('#province_dam_per_brgy').val() == "" || $('#city_dam_per_brgy').val() == "" || $('#brgy_dam_per_brgy').val() == ""){
		msgbox("Kindly select province, city/municipality and barangay to continue!");
	}
	else{
		if($('#damperbrgy_tot_aff_fam').val() == "" || $('#damperbrgy_tot_aff_person').val() == ""){
			msgbox("Please provide number of affected families and persons");
		}else{
			if(Number($('#damperbrgy_tot_aff_person').val()) < Number($('#damperbrgy_tot_aff_fam').val())){
				msgbox("Number of affected families must be lower than the affected persons");
			}else{
				let tot_damaged = Number($('#damperbrgy_totally').val()) + Number($('#damperbrgy_partially').val())
				if(Number(tot_damaged) > Number($('#damperbrgy_tot_aff_fam').val())){
					msgbox("Number of totally and partially damaged houses must not be greater than the total affeted families");
				}else{

					checkBrgyinDatabase(uriID, $('#city_dam_per_brgy').val(), $('#brgy_dam_per_brgy').val()).then(function(count){
						
						if(count > 0){
							msgbox(`Barangay ${$('#brgy_dam_per_brgy option:selected').text()} already exist in the database`);

							$('#brgy_dam_per_brgy').val("");
							$('#damperbrgy_totally').val("");
							$('#damperbrgy_partially').val("");
							$('#damperbrgy_tot_aff_fam').val("");
							$('#damperbrgy_tot_aff_person').val("");
							$('#damperbrgy_tot_aff_person').val("");

						}else{
							if(data_dam_per_brgy_arr.length < 1){

								populateArrDataDamPerBrgy();

								populateDataDamagePerBrgy(data_dam_per_brgy_arr);

								$('#brgy_dam_per_brgy').val("");
								$('#damperbrgy_totally').val("");
								$('#damperbrgy_partially').val("");
								$('#damperbrgy_tot_aff_fam').val("");
								$('#damperbrgy_tot_aff_person').val("");
								$('#damperbrgy_tot_aff_person').val("");

							}else{

								let count = 0;

								for(i = 0 ; i < data_dam_per_brgy_arr.length ; i++){
									if(Number($('#brgy_dam_per_brgy').val()) === Number(data_dam_per_brgy_arr[i]['brgy_id'])){
										count += 1;
									}
								}

								if(count > 0){
									msgbox("Barangay already exists in the list!");
								}else{
									populateArrDataDamPerBrgy();
								}
								populateDataDamagePerBrgy(data_dam_per_brgy_arr);
								$('#brgy_dam_per_brgy').val("");
								$('#damperbrgy_totally').val("");
								$('#damperbrgy_partially').val("");
								$('#damperbrgy_tot_aff_fam').val("");
								$('#damperbrgy_tot_aff_person').val("");
								$('#damperbrgy_tot_aff_person').val("");
							}
						}
					})
				}
			}
		}
	}
}

function populateArrDataDamPerBrgy(){

	var uriID = URLID();

	data_dam_per_brgy_arr.push({
		disaster_title_id  			: uriID,
		provinceid 							: $('#province_dam_per_brgy').val(), 
		municipality_id 	 			: $('#city_dam_per_brgy').val(), 		
		brgy_id 								: $('#brgy_dam_per_brgy').val(), 

		totally_damaged 				: $('#damperbrgy_totally').val(), 
		partially_damaged 			: $('#damperbrgy_partially').val(),

		tot_aff_fam 						: $('#damperbrgy_tot_aff_fam').val(), 
		tot_aff_person 					: $('#damperbrgy_tot_aff_person').val(), 

		dead 										: '0', 
		injured 								: '0', 
		missing 								: '0',

		costasst_brgy 					: $('#costasst_brgy').val(),

		province_name 					: $('#province_dam_per_brgy option:selected').text(),
		municipality_name	 			: $('#city_dam_per_brgy option:selected').text(),		
		brgy_name								: $('#brgy_dam_per_brgy option:selected').text()
	})

}

function checkBrgyinDatabase(disaster_title_id, municipality_id, brgy_id){

	let count = 0;

	let datas = {
		disaster_title_id : disaster_title_id,
		municipality_id 	: municipality_id,
		brgy_id 					: brgy_id
	};

  return $.getJSON("/Pages/checkBrgy_tbl_damage_per_brgy", datas)
    .then(function(count) {
        return count;
    })

}	


$('#savedata_dam_per_brgy').click(function(){

	var uriID = URLID();

	if(data_dam_per_brgy_arr.length < 1){
		msgbox(`Kindly provide data to continue`);
	}else{

		let data = {
			data_dam_per_brgy_arr
		}

		let result = $.getJSON("/Pages/saveDamageperBrgy",data);

		result.then(function(response){

					data_dam_per_brgy_arr = [];
					populateDataDamagePerBrgy(data_dam_per_brgy_arr);
					alerts();
					get_dromic(uriID);

					$('#savedata_dam_per_brgy').show();
					$('#updatedata_dam_per_brgy').hide();
					$('#deldata_dam_per_brgy').hide();

		})
	}

})

var assistancetype_li = $('#assistancetype');

if(assistancetype_li.length){

	$('#assistancetype').empty().append(
		"<option value=''>-- Assistance Type --</option>"
	);

	$.getJSON("/Pages/get_assistancetype_li",function(a){
		for(var i in a){
			$('#assistancetype').append(
				"<option value='"+a[i].assistance_type_sub_gen+"'>"+a[i].assistance_name+"</option>"
			)
		}
	});

	$.getJSON("/Pages/get_disaster_events",function(a){
		for(var i in a){
			$('#disasterevent').append(
				"<option value='"+a[i].id+"'>"+a[i].disaster_name+"</option>"
			)
		}
	});

}

var ass;
var asst_list = [];

$('#assistancetype').change(function(){
	
	ass = $('#assistancetype').val();

	if(ass == "aug" || ass == "aug_ffw" || ass == "aug_fsub" || ass == "prep"){
		$('#chooseasst').empty().append(
			"<option value=''>--- Select Assistance ---</option>"
		)
		$.getJSON("/Pages/get_fnfi",function(a){
			for(var i in a){
				$('#chooseasst').append(
					"<option value='"+a[i].id+"'>"+a[i].fnfi_name+"</option>"
				)
			}
		});
	}else{
		$('#chooseasst').empty();
		$.getJSON("/Pages/get_assistancetype_li",function(a){
			for(var i in a){
				if(a[i].assistance_type_sub_gen == ass){
					$('#chooseasst').append(
						"<option value='"+a[i].assistance_type_sub_gen+"'>"+a[i].assistance_name+"</option>"
					)
					$('#acost').val(a[i].cost);
				}
				
			}
		});
	}

})



$('#addasst').click(function(){

	asst_list.push({
		assistance_sub_gen 		 	: ass,
		assistance_name 				: $('#chooseasst option:selected').text(),
		cost 										: $('#acost').val(),
		quantity 								: $('#quantity').val(),
		date_aug 								: todate2($('#single_cal1').val())
	})

	asst_list_item();

})

function asst_list_item(){

	$('#tbl_asstlist tbody').empty();

	for(var i in asst_list){
		$('#tbl_asstlist tbody').append(
			"<tr>"+
				"<td>"+asst_list[i].assistance_name+"</td>"+
				"<td style='text-align:right'>"+asst_list[i].cost+"</td>"+
				"<td style='text-align:right'>"+asst_list[i].quantity+"</td>"+
				"<td style='text-align:right'>"+(Number(asst_list[i].quantity) * Number(asst_list[i].cost)).toLocaleString()+"</td>"+
				"<td style='text-align:center; vertical-align:middle'><button type='button' class='btn btn-danger btn-xs removeasst_li' value='"+i+"'><i class='fa fa-times-circle'></i></button></td>"+
			"</tr>"
		)
	}

}

$("#tbl_asstlist").on('click','.removeasst_li',function(){

	var k = $(this).val();

	$(this).closest('tr').remove();

	asst_list.splice(k,1);

	asst_list_item();

});

$('#saveasst_spec').click(function(){

	var tot = 0;

	for(var l in asst_list){
		tot = tot + (Number(asst_list[l].cost) * Number(asst_list[l].quantity));
	}

	var datas = {
		details :{
			provinceid  						: $('#province').val(),
			municipality_id 				: $('#city').val(),
			number_served 					: $('#augnumberserved').val(),
			amount 									: tot,
			assistance_type_code 		: $('#assistancetype').val(),
			remarks_particulars 		: $('#remarks_particulars').val(),
			disaster_event 					: $('#disasterevent').val()
		},
		asst_list
	}

	if(datas.details.provinceid == "" || datas.details.municipality_id == "" || datas.details.number_served == "" || datas.details.amount == ""){
		msgbox("Kindly fill province, municipality, number served, assistance type and augmentation date to continue!");
	}else{

		$.getJSON("/Pages/save_augmentation_assistance",datas,function(a){

			var assttyperelief = $('#assttyperelief').val();

			var yearss = new Date();

			y = $.datepicker.formatDate('yy', new Date(yearss));
			m = $.datepicker.formatDate('mm', new Date(yearss));

			get_augmentation_list(m,y,assttyperelief);

			$('#province').val('');
			$('#city').val('');
			$('#augnumberserved').val('');
			$('#assistancetype').val('');
			$('#remarks_particulars').val('');
			$('#single_cal1').val('');
			$('#chooseasst').val('');
			$('#acost').val('');
			$('#quantity').val('');
			$('#disasterevent').val('');

			asst_list = [];
			asst_list_item();
		});
	}

})

var tbl_congressional = $('#tbl_congressional');

$('#exporttoexcelcongy').click(function(){

	var cyimplementy = $('#cyimplementy').text();

	toExcelTableCong("tbl_congressional_year","Yearly Congressional Report "+cyimplementy);

})

$('#exporttoexcelcongs').click(function(){

	//var cyimplementy = $('#cyimplementy').text();

	toExcelTableCong("tbl_congressional_sem","Semestral Congressional Report "+'1st Semester');

})

$('#exporttoexcelcongq').click(function(){

	var quarters = ["1st","2nd","3rd","4th"];

	if($('#quarterpicker').val() == ""){

		var today = new Date();
		var month = today.getMonth() + 1;
	    var quarter = Math.ceil(month / 3);
	    y = $.datepicker.formatDate('yy', today);

	    for(var i in quarters){
			if(Number(quarter-1) == i){
				toExcelTableCong("tbl_congressional_quarter",quarters[i]+" Quarter " +y+ " Congressional Report");
				break;
			}
		}

		
	}else{

		var quarter = $('#quarterpicker').val();

		quarter = quarter.split("-");

		m = quarter[0];
		y = quarter[1];

		if(isnull(m) == "-" || isnull(y) == "-"){
			$.confirm({
			    title: '<span class="red">Error!</span>',
			    content: 'The value you enter is invalid.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Okay',
			    		btnClass: 'btn-danger',
			    	}
			    }
			});
		}else{
			if(m > 4){
				$.confirm({
				    title: '<span class="red">Error!</span>',
				    content: 'The value you enter is invalid.',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Okay',
				    		btnClass: 'btn-danger',
				    	}
				    }
				});
			}else{
				for(var i in quarters){
					if(Number(m-1) == i){
						toExcelTableCong("tbl_congressional_quarter",quarters[i]+" Quarter " +y+ " Congressional Report");
						break;
					}
				}
			}
		}

	}

})

if(tbl_congressional.length){


	$('#exporttoexcelcong').click(function(){

		if($('#monthpicker').val() == ""){
			var year = new Date();
			y = $.datepicker.formatDate('yy', new Date(year));
			m = $.datepicker.formatDate('MM', new Date(year));

			toExcelTableCong("tbl_congressional","Congressional Database_Cale_"+y+"- DReAMU"+" "+m+ " "+y);
		}else{

			var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

			var month = $('#monthpicker').val();

			month = month.split("-");

			m = month[0];
			y = month[1];

			if(isnull(m) == "-" || isnull(y) == "-"){
				$.confirm({
				    title: '<span class="red">Error!</span>',
				    content: 'The value you enter is invalid.',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Okay',
				    		btnClass: 'btn-danger',
				    	}
				    }
				});
			}else{
				if(m > 12){
					$.confirm({
					    title: '<span class="red">Error!</span>',
					    content: 'The value you enter is invalid.',
					    buttons: {
					    	confirmAction: {
					    		text: '<i class="fa fa-check"></i> Okay',
					    		btnClass: 'btn-danger',
					    	}
					    }
					});
				}else{
					for(var i in months){
						if(Number(m-1) == i){
							toExcelTableCong("tbl_congressional","Congressional Database_Cale_"+y+"- DReAMU"+" "+months[i]+ " "+y);
							break;
						}
					}
				}
			}

		}

	})

	var toExcelTableCong = function(tbl,name){
		$("#"+tbl).table2excel({
			exclude 	: ".noExl",
			name 		: 'Sheet1',
			filename 	: name
		});
	}

	$("#monthpicker").mask('00-0000');
	$("#quarterpicker").mask('00-0000');

	var year = new Date();
	y = $.datepicker.formatDate('yy', new Date(year));
	m = $.datepicker.formatDate('mm', new Date(year));

	congressional(m,y);

	var today = new Date();
	var month = today.getMonth() + 1;
    var quarter = Math.ceil(month / 3);

    quarterly_congressional(quarter,y);

} 

function congressional(month,year){

	var serve 	= "";
	var amount 	= "";

	var datas = {
		month 	: month,
		year 	: year
	}

	$('#tbl_congressional tbody').empty();

	$.getJSON("/Pages/get_congressional",datas,function(response){

		$('#congreloader').hide();

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.cfw2){
					if(response.cfw2[k].municipality_id == response.city[i].municipality_id){
						serve	= response.cfw2[k].serve;
						amount	= response.cfw2[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Cash for Work  is short term intervention aims for temporarry provision of employment to distress/displaced individualsby participating on preparedness,mitigation,relief,rehabilitaion or risk reduction activities , in exchange for service render profgram receipient will be provided cash assistance.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.esa){
					if(response.esa[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.esa[k].serve;
						amount	= response.esa[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Is provision of of emergency 'self build' shelter assistance thru limited material/financial assistance of affected families.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.ffw){
					if(response.ffw[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.ffw[k].serve;
						amount	= response.ffw[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			for(var k in response.aug){
				if(response.aug[k].municipality_id == response.city[i].municipality_id){
					serve 	= response.aug[k].serve;
					amount	= response.aug[k].amount;
				}
			}
			if(i == 0){
				$('#tbl_congressional tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='90'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}else{
				$('#tbl_congressional tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}

			serve 	= "";
			amount 	= "";
		}

	});


}

$('#monthpicker').keydown(function(e){
	if(e.keyCode == 13){
	    $('#monthsearch').trigger("click");
	}
})

$('#monthsearch').click(function(){

	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	var month = $('#monthpicker').val();

	month = month.split("-");

	m = month[0];
	y = month[1];

	if(isnull(m) == "-" || isnull(y) == "-"){
		$.confirm({
		    title: '<span class="red">Error!</span>',
		    content: 'The value you enter is invalid.',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		if(m > 12){
			$.confirm({
			    title: '<span class="red">Error!</span>',
			    content: 'The value you enter is invalid.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Okay',
			    		btnClass: 'btn-danger',
			    	}
			    }
			});
		}else{
			$('#congreloader').show();
			$('#cyimplement').text(y);
			for(var i in months){
				if(Number(m-1) == i){
					$('#asofimplement').text(months[i]+" "+y);
					break;
				}
			}
			
			congressional(m,y);
		}
	}

})

$('#quarterpicker').keydown(function(e){
	if(e.keyCode == 13){
	    $('#quartersearch').trigger("click");
	}
})

$('#quartersearch').click(function(){

	var quarters = ["1<sup>st</sup>","2<sup>nd</sup>","3<sup>rd</sup>","4<sup>th</sup>"];

	var quarter = $('#quarterpicker').val();

	quarter = quarter.split("-");

	m = quarter[0];
	y = quarter[1];

	if(isnull(m) == "-" || isnull(y) == "-"){
		$.confirm({
		    title: '<span class="red">Error!</span>',
		    content: 'The value you enter is invalid.',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		if(m > 4){
			$.confirm({
			    title: '<span class="red">Error!</span>',
			    content: 'The value you enter is invalid.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Okay',
			    		btnClass: 'btn-danger',
			    	}
			    }
			});
		}else{
			$('#congreloader').show();
			$('#cyimplementq').text(y);
			for(var i in quarters){
				if(Number(m-1) == i){
					$('#asofimplementq').empty().append(quarters[i]+ " Quarter "+" "+y);
					break;
				}
			}
			
			quarterly_congressional(m,y);
		}
	}

})

$('#yearpicker').keydown(function(e){
	if(e.keyCode == 13){
	    $('#yearsearch').trigger("click");
	}
})

$('#yearsearch').click(function(){

	var year = $('#yearpicker').val();

	if(isnull(year) == "-"){
		$.confirm({
		    title: '<span class="red">Error!</span>',
		    content: 'The value you enter is invalid.',
		    buttons: {
		    	confirmAction: {
		    		text: '<i class="fa fa-check"></i> Okay',
		    		btnClass: 'btn-danger',
		    	}
		    }
		});
	}else{
		$('#congreloader').show();
		$('#cyimplementy').text(year);
		yearly_congressional(year);
	}

})

var tbl_congressional_year = $('#tbl_congressional_year');

if(tbl_congressional_year.length){

	var year = new Date();
	y = $.datepicker.formatDate('yy', new Date(year));
	yearly_congressional(y);

}

sem_congressional();

function sem_congressional(){

	var serve 	= "";
	var amount 	= "";

	// var datas = {
	// 	sem 	: year
	// }

	$('#tbl_congressional_sem tbody').empty();

	$.getJSON("/Pages/get_congressional_sem",function(response){

		$('#congreloader').hide();

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.cfw2){
					if(response.cfw2[k].municipality_id == response.city[i].municipality_id){
						serve	= response.cfw2[k].serve;
						amount	= response.cfw2[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_sem tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Cash for Work  is short term intervention aims for temporarry provision of employment to distress/displaced individualsby participating on preparedness,mitigation,relief,rehabilitaion or risk reduction activities , in exchange for service render profgram receipient will be provided cash assistance.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_sem tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.esa){
					if(response.esa[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.esa[k].serve;
						amount	= response.esa[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_sem tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Is provision of of emergency 'self build' shelter assistance thru limited material/financial assistance of affected families.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_sem tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.ffw){
					if(response.ffw[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.ffw[k].serve;
						amount	= response.ffw[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_sem tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_sem tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			for(var k in response.aug){
				if(response.aug[k].municipality_id == response.city[i].municipality_id){
					serve 	= response.aug[k].serve;
					amount	= response.aug[k].amount;
				}
			}
			if(i == 0){
				$('#tbl_congressional_sem tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='90'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}else{
				$('#tbl_congressional_sem tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}

			serve 	= "";
			amount 	= "";
		}

	});

}

function yearly_congressional(year){

	var serve 	= "";
	var amount 	= "";

	var datas = {
		year 	: year
	}

	$('#tbl_congressional_year tbody').empty();

	$.getJSON("/Pages/get_congressional_yearly",datas,function(response){

		$('#congreloader').hide();

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.cfw2){
					if(response.cfw2[k].municipality_id == response.city[i].municipality_id){
						serve	= response.cfw2[k].serve;
						amount	= response.cfw2[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_year tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Cash for Work  is short term intervention aims for temporarry provision of employment to distress/displaced individualsby participating on preparedness,mitigation,relief,rehabilitaion or risk reduction activities , in exchange for service render profgram receipient will be provided cash assistance.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_year tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.esa){
					if(response.esa[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.esa[k].serve;
						amount	= response.esa[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_year tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Is provision of of emergency 'self build' shelter assistance thru limited material/financial assistance of affected families.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_year tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.ffw){
					if(response.ffw[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.ffw[k].serve;
						amount	= response.ffw[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_year tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_year tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			for(var k in response.aug){
				if(response.aug[k].municipality_id == response.city[i].municipality_id){
					serve 	= response.aug[k].serve;
					amount	= response.aug[k].amount;
				}
			}
			if(i == 0){
				$('#tbl_congressional_year tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='90'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}else{
				$('#tbl_congressional_year tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}

			serve 	= "";
			amount 	= "";
		}

	});

}

function quarterly_congressional(quarter,year){

	var serve 	= "";
	var amount 	= "";

	var datas = {
		quarter : quarter,
		year 	: year
	}

	$('#tbl_congressional_quarter tbody').empty();

	$.getJSON("/Pages/get_congressional_quart",datas,function(response){

		$('#congreloader').hide();

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.cfw2){
					if(response.cfw2[k].municipality_id == response.city[i].municipality_id){
						serve	= response.cfw2[k].serve;
						amount	= response.cfw2[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_quarter tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Cash for Work  is short term intervention aims for temporarry provision of employment to distress/displaced individualsby participating on preparedness,mitigation,relief,rehabilitaion or risk reduction activities , in exchange for service render profgram receipient will be provided cash assistance.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_quarter tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Cash-for-Work Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.esa){
					if(response.esa[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.esa[k].serve;
						amount	= response.esa[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_quarter tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Is provision of of emergency 'self build' shelter assistance thru limited material/financial assistance of affected families.</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_quarter tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Emergency Shelter Assistance)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			if(response.city[i].district != "Z"){
				for(var k in response.ffw){
					if(response.ffw[k].municipality_id == response.city[i].municipality_id){
						serve 	= response.ffw[k].serve;
						amount	= response.ffw[k].amount;
					}
				}
				if(i == 0){
					$('#tbl_congressional_quarter tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='73'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}else{
					$('#tbl_congressional_quarter tbody').append(
						"<tr>"+
							"<td style='padding:3px; border: 1px solid #000'>Disaster (Food for Work)</td>"+
							"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
							"<td style='padding:3px; border: 1px solid #000'></td>"+
						"</tr>"
					)
				}

				serve 	= "";
				amount 	= "";
			}
		}

		for(var i in response.city){
			for(var k in response.aug){
				if(response.aug[k].municipality_id == response.city[i].municipality_id){
					serve 	= response.aug[k].serve;
					amount	= response.aug[k].amount;
				}
			}
			if(i == 0){
				$('#tbl_congressional_quarter tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000; width:300px'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000; width: 100px; text-align:justify' rowspan='90'>Provision of food to disaster survivors in exchange to their effort in rendering a community volunteer work in restoring/rebuilding their damaged houses</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}else{
				$('#tbl_congressional_quarter tbody').append(
					"<tr>"+
						"<td style='padding:3px; border: 1px solid #000'>Disaster Relief Augmentation</td>"+
						"<td style='padding:3px; border: 1px solid #000'>"+response.city[i].province_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:center'>"+response.city[i].district+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:left'>"+response.city[i].municipality_name+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'>Families</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(serve.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000; text-align:right'>"+isnull(amount.toLocaleString())+"</td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
						"<td style='padding:3px; border: 1px solid #000'></td>"+
					"</tr>"
				)
			}

			serve 	= "";
			amount 	= "";
		}

	});

}


$('#famcumO').keyup(function(){

	$('#famnowO').val($('#famcumO').val());

	var ar = $('#famcumO').val();
	ar = Number(ar) * 5;

	$('#personcumO').val(ar);
	$('#personnowO').val(ar);

})

$('#famnowO').keyup(function(){

	var ar = $('#famnowO').val();
	ar = Number(ar) * 5;

	$('#personnowO').val(ar);

})

$('#personcumO').keyup(function(){

	var aa = $('#personcumO').val();

	$('#personnowO').val(aa);

})


$('#searchmonthrelief').mask('00-0000');

$('#searchmonthrelief').keyup(function(e){

	var val = $('#searchmonthrelief').val();
	var assttyperelief = $('#assttyperelief').val();

	val = val.split("-");

	if(e.keyCode == 13){

		if(isnull(val[0]) == "-" || isnull(val[1]) == "-"){
			$.confirm({
			    title: '<span class="red">Error!</span>',
			    content: 'The value you enter is invalid.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Okay',
			    		btnClass: 'btn-danger',
			    	}
			    }
			});
		}else{
			if(val[0] > 13){
				$.confirm({
				    title: '<span class="red">Error!</span>',
				    content: 'The value you enter is invalid.',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Okay',
				    		btnClass: 'btn-danger',
				    	}
				    }
				});
			}else{
				get_augmentation_list(val[0],val[1],assttyperelief);
			}
		}
      
    }

})

$('#assttyperelief').change(function(){

	var assttyperelief = $('#assttyperelief').val();

	if($('#searchmonthrelief').val() == ""){

		var yearss = new Date();
		y = $.datepicker.formatDate('yy', new Date(yearss));
		m = $.datepicker.formatDate('mm', new Date(yearss));

		get_augmentation_list(m,y,assttyperelief);

	}else{

		var val = $('#searchmonthrelief').val();

		val = val.split("-");

		if(isnull(val[0]) == "-" || isnull(val[1]) == "-"){
			$.confirm({
			    title: '<span class="red">Error!</span>',
			    content: 'The value you enter is invalid.',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Okay',
			    		btnClass: 'btn-danger',
			    	}
			    }
			});
		}else{
			if(val[0] > 13){
				$.confirm({
				    title: '<span class="red">Error!</span>',
				    content: 'The value you enter is invalid.',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Okay',
				    		btnClass: 'btn-danger',
				    	}
				    }
				});
			}else{
				get_augmentation_list(val[0],val[1],assttyperelief);
			}
		}

	}

})

var my_users_list = $('#my_users_list');


if(my_users_list.length){
	getMobileUsers();
	$('#loader').hide();
}

var useractivation = -1;

function getMobileUsers(){

	$('#my_users_list tbody').empty();

	$.getJSON("/Pages/get_mobile_user",function(a){

		for(var i in a){

			var string = a[i].time_registered;

			string = string.split(":");

			var h = string[0];

			var m = string[1];

			var s = string[2];

			s = s.split(".");

			var ss = s[0];

			var time_registered = h + ":" + m + ":" + ss;

			if(a[i].isactivated == 't'){
				var style = 'background-color : #DFF0D8';
				var name = "deactivateuser";
			}else{
				var style = 'background-color : #F2DEDE';
				var name = "activateuser";
			}

			$('#my_users_list tbody').append(
				"<tr style='"+style+"'>"+
					"<td style='text-align:left'>"+a[i].firstname+" "+a[i].lastname+"</td>"+
					"<td style='text-align:center'>"+a[i].address+"</td>"+
					"<td style='text-align:center'>"+a[i].agency+"</td>"+
					"<td style='text-align:center'>"+a[i].designation+"</td>"+
					"<td style='text-align:center'>"+a[i].emailaddress+"</td>"+
					"<td style='text-align:center'>"+a[i].mobile+"</td>"+
					"<td style='text-align:center'>"+a[i].username+"</td>"+
					"<td style='text-align:center'>"+todate(a[i].date_registered)+"</td>"+
					"<td style='text-align:center'>"+time_registered+"</td>"+
					"<td style='text-align:center'>"+
						"<input type='checkbox' class='btn btn-xs btn-danger' data-toggle='tooltip' title='Click to select user' style='display: none' name='"+name+"' value='"+a[i].id+"'>"+
					"</td>"+
				"</tr>"
			);

		}

		$('[data-toggle="tooltip"]').tooltip();

		$('#btnactivateuser').click(function(){

			$('[name="activateuser"]').css({
				'display' : 'inline'
			})

			$('[name="deactivateuser"]').css({
				'display' : 'none'
			})

			useractivation = 1;

		})

		$('#btndeactivateuser').click(function(){

			$('[name="deactivateuser"]').css({
				'display' : 'inline'
			})

			$('[name="activateuser"]').css({
				'display' : 'none'
			})

			useractivation = 0;

		})

	})

}

$('#btnsaveactivation').click(function(){

	if(useractivation < 0){

		msgbox("Kindly select action to cotinue!");

	}else{

		if(useractivation == 0){

			var arr = $('[name="deactivateuser"]');

			var userslist = [];

			for(var i = 0 ; i < arr.length ; i++){

				if(arr[i].checked == 1){

					userslist.push({
						id : arr[i].value
					});

				}

			}


			if(userslist.length < 1){

				msgbox("Kindly select users to continue!");

			}else{

				var datas = {

					userslist

				}

				$.getJSON("/Pages/deactivateuser",datas,function(a){
					getMobileUsers();

					useractivation = -1;

				});

			}


		}else{

			var arr = $('[name="activateuser"]');

			var userslist = [];

			for(var i = 0 ; i < arr.length ; i++){

				

				if(arr[i].checked == 1){

					userslist.push({
						id : arr[i].value
					});

				}

			}

			if(userslist.length < 1){

				msgbox("Kindly select users to continue!");

			}else{

				var datas = {

					userslist

				}

				$.getJSON("/Pages/activateuser",datas,function(a){

					getMobileUsers();

					useractivation = -1;

				});


			}

		}

	}

})

var my_tbl_disaster = $('#my_tbl_disaster');


if(my_tbl_disaster.length){
	ReportsAssignment();
	$('#loader').hide();
}

function ReportsAssignment(){

	var datas = {

		username : $('#usernameid').text()

	};

	$('#my_tbl_disaster tbody').empty();

	$('#tbl_users_list tbody').empty();

	$.getJSON("/Pages/get_my_disaster",datas,function(a){

		for(var i = 0 ; i < a.disaster.length ; i++){

			$('#my_tbl_disaster tbody').append(
				"<tr>"+
					"<td style='text-align:center'>"+ Number(i+1) + "</td>"+
					"<td>"+a.disaster[i].disaster_name+"</td>"+
					"<td style='text-align:center'>"+todate(a.disaster[i].disaster_date)+"</td>"+
					"<td style='text-align:center'><input type='checkbox' value='"+a.disaster[i].id+"' name='checkdisaster'></td>"+
				"</tr>"
			)

		}

		for(var i in a.users){

			$('#tbl_users_list tbody').append(
				"<tr>"+
					"<td>"+a.users[i].fullname+"</td>"+
					"<td style='text-align:center'>"+a.users[i].province_name+"</td>"+
					"<td style='text-align:center'>"+a.users[i].municipality_name+"</td>"+
					"<td style='text-align:center'>"+a.users[i].agency+"</td>"+
					"<td style='text-align:center'>"+a.users[i].designation+"</td>"+
					"<td style='text-align:center'><input type='checkbox' value='"+a.users[i].username+"' name='checkuser'></td>"+
				"</tr>"
			)

		}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// $('#tbl_users_list').DataTable({
		// 	bLengthChange : !1
		// });

		// $('#my_tbl_disaster').DataTable({
		// 	bLengthChange : !1,
		// 	bSort : !1
		// });

		// $("[name='checkdisaster']").click(function(){

		// 	var disaster_reports = [];

		// 	var d = $("[name='checkdisaster']");

		// 	for(var j = 0 ; j < d.length ; j++){

		// 		if(d[j].checked == true){
		// 			disaster_reports.push(d[j].value);
		// 		}

		// 	}

		// 	if(disaster_reports.length < 1){

		// 		var u = $("[name='checkuser']");

		// 		for(var j = 0 ; j < u.length ; j++){

		// 			u[j].checked = false;

		// 		}

		// 	}

		// });

		// $("[name='checkuser']").click(function(){

		// 	var disaster_reports = [];

		// 	var d = $("[name='checkdisaster']");

		// 	for(var j = 0 ; j < d.length ; j++){

		// 		if(d[j].checked == true){
		// 			disaster_reports.push(d[j].value);
		// 		}

		// 	}

		// 	if(disaster_reports.length < 1){

		// 		msgbox("Kindly select report/s to assign!");

		// 		var u = $("[name='checkuser']");

		// 		for(var j = 0 ; j < u.length ; j++){

		// 			u[j].checked = false;

		// 		}

		// 	}


		// })

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	});

}

$('#btn_reportassignment').click(function(){

	var disaster_reports = [];

	var users_list = [];

	var data = [];

	var username = $('#usernameid').text();

	var d = $("[name='checkdisaster']");

	for(var j = 0 ; j < d.length ; j++){

		if(d[j].checked == true){
			disaster_reports.push({
				dromic_id : d[j].value
			});
		}

	}

	var u = $("[name='checkuser']");

	for(var j = 0 ; j < u.length ; j++){

		if(u[j].checked == true){
			users_list.push({
				can_access_username: u[j].value
			});
		}

	}


	if(disaster_reports.length < 1 || users_list.length < 1){

		msgbox("Kindly select Disaster Report and Users to continue!");

	}else{

		if($('#reportpriv').val() == ""){

			msgbox("Kindly select privileges to continue");

		}else{


			var datas = {
				disaster_reports 	: disaster_reports,
				users_list 			: users_list,
				username 			: username,
				can_edit 			: $('#reportpriv').val()
			};

		// console.log(datas);

			$.confirm({
			    title: '<span class="red">Confirm Action!</span>',
			    content: 'Are you sure you to assign the reports to selected user/s?',
			    buttons: {
			    	confirmAction: {
			    		text: '<i class="fa fa-check"></i> Yes',
			    		btnClass: 'btn-blue',
			    		action: function(){

			    			$('#loader').show();

			    			$.getJSON("/Pages/save_reports_assignment",datas,function(a){

			    				$('#loader').hide();

								if(a == 1){

									alerts();

									var d = $("[name='checkdisaster']");

									for(var j = 0 ; j < d.length ; j++){

										d[j].checked = false;

									}

									var u = $("[name='checkuser']");

									for(var j = 0 ; j < u.length ; j++){

										u[j].checked = false;

									}

								}else{

									msgbox("Ooops... Something went wrong while saving data!");

								}

							});
			            }
			    	},
			    	cancelAction: {
			    		text: '<i class="fa fa-times-circle"></i> No',
			    		btnClass: 'btn-red',
			    		action: function(){

			    			var d = $("[name='checkdisaster']");

							for(var j = 0 ; j < d.length ; j++){

								d[j].checked = false;

							}

							var u = $("[name='checkuser']");

							for(var j = 0 ; j < u.length ; j++){

								u[j].checked = false;

							}

			            }
			    	}
			    }

			});

		}


	}



})


$('#addCommentsbtn').click(function(){

	$('#addCommentsModal').modal('show');

})

function saveComment(){

	var uriID = URLID();

	var datas = {

		msg 		: $('#txt_comment').val(),
		id 			: uriID,
		username 	: $('#usernameid').text()

	}

	if(datas.msg == ""){
		msgbox("Kindly input message to continue!");
	}else{

		$.getJSON("/Pages/save_report_comment",datas,function(a){

			if(a == 1){

				alerts("Comment successfully saved!");

				$('#txt_comment').val('');	

				get_comments();

			}else{

				msgbox("Ooops... something went wrong while trying to save the comment.");

			}

		});
	}

}

function get_comments(){
	
	var uriID = URLID();

	var datas = {

		id 		: uriID

	}

	$('#div_comment').empty();

	$.getJSON("/Pages/get_comments",datas,function(a){

		var c = 0;


		for(var i in a.comment){

			c += 1;

			var d = a.comment[i].time;

			d = d.split(':');

			var h = d[0];

			if(Number(h) > 12){

				var hr = Number(h) - 12;

			}else{

				var hr = d[0];

			}

			if(Number(h) >= 12){
				var postfix = "pm";
			}else{
				var postfix = "am";
			}

			var mr = d[1];

			if($('#usernameid').text() == a.comment[i].by_user){
				var string = "<button class='btn btn-xs btn-primary' style='border-radius: 100px'>Edit</button>";
			}else{
			 	var string = "";
			}

			var str = "";

			for(var j in a.reply){

				if(a.reply[j].comment_id == a.comment[i].id){

					var dd = a.reply[j].time;

					dd = dd.split(':');

					var hs = dd[0];

					if(Number(hs) > 12){

						var hrs = Number(hs) - 12;

					}else{

						var hrs = dd[0];

					}

					if(Number(hs) >= 12){
						var postfixs = "pm";
					}else{
						var postfixs = "am";
					}

					var mrs = dd[1];


					str += "<div class='col-sm-12' style='background-color: #f0f0f0; border-radius: 20px; padding: 3px; margin-bottom: 3px'><div class='col-sm-10'> <label style='cursor:pointer'>" + a.reply[j].by_user + "</label> " +a.reply[j].msg+"</div> <div class='col-sm-2 pull-right' style='text-align:right'>"+ todate(a.reply[j].date_added)+ " " +hrs+":"+mrs+" "+postfixs+"</div></div>";

				}

			}

			var string = "";

			$('#div_comment').append(

				"<div class='panel panel-danger'>"+
			      "<div class='panel-heading'>" + todate(a.comment[i].date) + " " + hr + ":" + mr + " " + postfix + "</div>"+
			      "<div class='panel-body'>"+
			      	"<div class='col-sm-12' style='background-color: #F0F8FF; border-radius: 20px; padding: 5px; vertical-align:middle'> <label style='cursor:pointer; margin-bottom: 3px'>" + a.comment[i].by_user + "</label> " +a.comment[i].msg+"</div>"+ //string +
			      	"<div class='col-sm-12' style='margin-top: 3px'><button class='btn btn-xs btn-primary' style='border-radius: 100px' onclick='showReply("+i+")'>Reply</button> " + string +" </div>"+
			      	str+
			      	// "<div class='col-sm-12'><div class='col-sm-12' style='background-color: #f0f0f0; border-radius: 20px; padding: 5px; margin-bottom: 3px'> <label style='cursor:pointer'>" + a.comment[i].by_user + "</label> " +a.comment[i].msg+"</div></div>"+ //string +
			      	"<div style='display:none' id='divreply_"+i+"'>"+
				      	"<div class='col-sm-11'><textarea data-autoresize class='form-control input-sm' style='border-radius: 5px; resize:none ; overflow: hidden' placeholder='Write a reply...' id='txtreply_"+i+"' rows='1'></textarea></div>"+
				      	"<div class='col-sm-1'><button class='btn btn-xs btn-success pull-right' style='border-radius: 100px; margin-top: 5px' onclick='saveReply("+i+","+a.comment[i].id+")'> <i class='fa fa-save'></i></button></div>"+
				    "</div>"+
			      "</div>"+
			    "</div>"

			)

			jQuery.each(jQuery('textarea[data-autoresize]'), function() {
			    var offset = this.offsetHeight - this.clientHeight;
			 
			    var resizeTextarea = function(el) {
			        jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
			    };
			    jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
			});

		}

		$('#commentcounter').text(c);

	});

}

jQuery.each(jQuery('textarea[data-autoresize]'), function() {
    var offset = this.offsetHeight - this.clientHeight;
 
    var resizeTextarea = function(el) {
        jQuery(el).css('height', 'auto').css('height', el.scrollHeight + offset);
    };
    jQuery(this).on('keyup input', function() { resizeTextarea(this); }).removeAttr('data-autoresize');
});

function showReply(i){

	$("#divreply_"+i).css({
		'display' : 'inline'
	})

}

function hideReply(i){

	$("#divreply_"+i).css({
		'display' : 'none'
	})

}

function saveReply(i,id){

	var uriID = URLID();

	var string = $('#txtreply_'+i).val();

	var datas = {

		id 			: uriID,
		msg  		: string,
		comment_id 	: id,
		username 	: $('#usernameid').text(),


	}

	if(datas.msg == ""){

		$('#txtreply_'+i).val('');
		$("#divreply_"+i).css({
			'display' : 'none'
		})

	}else{

		$.getJSON("/Pages/save_reply",datas,function(a){

			if(a == 1){

				$('#txtreply_'+i).val('');

				$("#divreply_"+i).css({
					'display' : 'none'
				})

				get_comments();

			}else{

				msgbox("Ooops... something went wrong while trying to save the comment.");

			}

		});
	}

}


function uploadFile(){

	if(!$('#txt_file').val()){

		$('#dropbox').html("<div class='alert alert-error'>Kindly select file...</div>");

     	setTimeout(function(){

     		$('#dropbox').html("");

     	},2000)

	}else{

		var datas = {
			id : URLID()
		}


		$.getJSON("/Pages/get_if_narrative",datas,function(a){


			if(a >= 1){

				$.confirm({
				    title: '<span class="red">Confirm Action!</span>',
				    content: 'There is an existing narrative report with this DROMIC Report. Do you wish to overwrite the existing file.',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Yes',
				    		btnClass: 'btn-red',
				    		action: function(){
				    			
				    			var uriID 			= URLID(); 

								var property 		= document.getElementById('txt_file').files[0];

								var image_name 		= property.name;

								var extension  		= image_name.split('.').pop().toLowerCase();

								if(jQuery.inArray(extension,['doc','docx']) == -1){

									msgbox("Invalid File Extension. Kindly upload only word documents.");

								}

								var image_size = property.size;

								if(image_size > 2000000){

									msgbox("File size is too big!");

								}else{

									var form_data = new FormData();

									form_data.append('file',property);

									form_data.append('disaster_title_id',uriID);
									form_data.append('by_user',$('#usernameid').text());


									$.ajax({

										url 			: 'Pages/upload_file',
										method 			: "POST",
										data 			: form_data,
										contentType 	: false,
										cache 			: false,
										processData 	: false,
										beforeSend 		: function(){
									     	$('#dropbox').html("<div class='alert alert-info'>File is uploading...</div>");
									    },   
									    success 		: function(data)
									    {
									     	$('#dropbox').html("<div class='alert alert-info'>File upload successful...</div>");

									     	setTimeout(function(){

									     		$('#dropbox').html("");

									     	},2000)

									     	$('#txt_file').val('');

									     	get_narrative_report();

									    }

									});

								}


				            }
				    	},
				    	cancelAction: {
				    		text: '<i class="fa fa-times-circle"></i> No',
				    		btnClass: 'btn-blue',
				    		action: function(){
				    			$('#txt_file').val('');
				    		}
				    	}
				    }
				});

			}else{

				var uriID 			= URLID(); 

				var property 		= document.getElementById('txt_file').files[0];

				var image_name 		= property.name;

				var extension  		= image_name.split('.').pop().toLowerCase();

				if(jQuery.inArray(extension,['doc','docx']) == -1){

					msgbox("Invalid File Extension. Kindly upload only word documents.");

				}

				var image_size = property.size;

				if(image_size > 2000000){

					msgbox("File size is too big!");

				}else{

					var form_data = new FormData();

					form_data.append('file',property);

					form_data.append('disaster_title_id',uriID);
					form_data.append('by_user',$('#usernameid').text());


					$.ajax({

						url 			: 'Pages/upload_file',
						method 			: "POST",
						data 			: form_data,
						contentType 	: false,
						cache 			: false,
						processData 	: false,
						beforeSend 		: function(){
					     	$('#dropbox').html("<div class='alert alert-info'>File is uploading...</div>");
					    },   
					    success 		: function(data)
					    {
					     	$('#dropbox').html("<div class='alert alert-info'>File upload successful...</div>");

					     	setTimeout(function(){

					     		$('#dropbox').html("");

					     	},2000)

					     	$('#txt_file').val('');

					     	get_narrative_report();

					    }

					});
				}

			}

		});

	}


}	


$('#addnarrativebtn').click(function(){

	$('#addNarrativeModal').modal({
		backdrop: 'static',
  		keyboard: false
	});

})

function getColor(d) {
    return d > 10000  ? '#7B3F00' :
           d > 5000 && d < 10001   ? '#80461B' :
           d > 3000 && d < 5001   ? '#B87333' :
           d > 1000 && d < 3001   ? '#D2B48C' :
           d > 0 && d < 1001   ? '#F5F5DC' :
                      '#FFFFFF';
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: .5,
        opacity: 1,
        color: '#000000',
        dashArray: '1',
        fillOpacity: 1
    };
}

$('#disaster_map').click(function(){

	var uriID = URLID();

	var datas = {

		id : uriID

	}

	$.getJSON("/Pages/get_map",datas,function(states){

		var map = L.map('mapid').setView([8.8015, 125.7407], 8.4);

		// L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiamxvbXBhZCIsImEiOiJjamV0ZG40N2YwNm40MzJxb3RxMnN5b2g4In0.q_GNXWnzRFMuPrZvHacgqA', {
		//     attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		//     maxZoom: 18,
		//     id: 'mapbox.light',
		//     accessToken: 'pk.eyJ1IjoiamxvbXBhZCIsImEiOiJjamV0ZG40N2YwNm40MzJxb3RxMnN5b2g4In0.q_GNXWnzRFMuPrZvHacgqA'
		// }).addTo(map);

		L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
		    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		    maxZoom: 18
		}).addTo(map);

		geojson = L.geoJson(states, {
		    style: style,
		    onEachFeature: onEachFeature
		}).addTo(map);

		var popup = L.popup();

		function highlightFeature(e) {
		    var layer = e.target;

		    layer.setStyle({
		        weight: 3,
		        color: '#666',
		        dashArray: '',
		        fillOpacity: 0.7
		    });

		    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		        layer.bringToFront();
		    }
		    info.update(layer.feature.properties);
		}

		function resetHighlight(e) {
		    geojson.resetStyle(e.target);
		    info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		    console.log(e.target.feature);
		}

		function onEachFeature(feature, layer) {
		    layer.on({
		        mouseover: highlightFeature,
		        mouseout: resetHighlight,
		        click: onMapClick
		    });
		}

		function onMapClick(e) {

			console.log(e.target.feature.properties.municipality_id);

		    var datas = {

		    	id 					: URLID(),
		    	municipality_id 	: e.target.feature.properties.municipality_id

		    };

		    $.getJSON("/Pages/get_feature_info",datas,function(a){

		    	var html = "<table class='table table-condensed table-bordered'>"+
		    					"<tbody>"+
		    						"<tr>"+
		    							"<th> Affected families (Inside EC) </th>"+
		    							"<th style='text-align: right'> "+addComma(a.inside[0].fam_cum)+" </th>"+
		    						"</tr>"+
		    						"<tr>"+
		    							"<th> Affected families (Outside EC) </th>"+
		    							"<th style='text-align: right'> "+addComma(a.outside[0].fam_cum)+" </th>"+
		    						"</tr>"+
		    						"<tr>"+
		    							"<th> Totally Damaged</th>"+
		    							"<th style='text-align: right'> "+addComma(a.dam_asst[0].totally_damaged)+" </th>"+
		    						"</tr>"+
		    						"<tr>"+
		    							"<th> Partially Damaged</th>"+
		    							"<th style='text-align: right'> "+addComma(a.dam_asst[0].partially_damaged)+" </th>"+
		    						"</tr>"+
		    						"<tr>"+
		    							"<th> Total Cost of DSWD Assistance</th>"+
		    							"<th style='text-align: right'> "+addCommaMoney(a.dam_asst[0].dswd_asst)+" </th>"+
		    						"</tr>"+
		    					"</tbody>"+
		    			   "</table>";

		    	popup
		        	.setLatLng(e.latlng)
		        	.setContent(html)
		        	.openOn(map);

		    });


		}

		var legend = L.control({position: 'bottomright'});

		legend.onAdd = function (map) {

		    var div = L.DomUtil.create('div', 'info legend'),
		        grades = [0, 10],
		        labels = [];

		    div.innerHTML += 'Number of affected families per city/municipality<br>';
		    div.innerHTML += '<i style="background-color: #d8cbc4"></i>1-1,000<br>';
		    div.innerHTML += '<i style="background-color: #D2B48C"></i>1,001-3,000<br>';
		    div.innerHTML += '<i style="background-color: #B87333"></i>3,001-5,000<br>';
		    div.innerHTML += '<i style="background-color: #80461B"></i>5,001-10,000<br>';
		    div.innerHTML += '<i style="background-color: #7B3F00"></i> > 10,000<br>';

		    return div;
		};

		legend.addTo(map);

		var info = L.control();

		info.onAdd = function (map) {
		    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		    this.update();
		    return this._div;
		};

		// method that we will use to update the control based on feature properties passed
		info.update = function (props) {
		    this._div.innerHTML = '<h4>Number of Affected Families</h4>' +  (props ?
		        '<span style="color: #FAEDB8"><b>' + props.municipality_name + ', ' + props.province_name + '</b> - ' + addCommaMap(props.density) + ' ' + family(props.density) + '</span> <h5>Click for more info.</h5> ' + ''
		        : 'Hover over a municipality');
		};

		info.addTo(map);

	});


})

function addCommaMap(item){
	if(isnull(item) == '-'){
		return item;
	}else{
		item = Number(item);
		return item.toLocaleString();
	}
}

function family(item){

	if(item <= 1){
		return 'family'; 
	}else{
		return 'families'
	}


}

$('#addfamaffected').click(function(){


	$('#addfamnInside').modal('show');

	$('#addfamNinsideECprov').val("");
	$('#addfamNinsideECcity').val("");

	$('#ecnfamcum').val("");
	$('#ecnpercum').val("");

	// $('#updatenECS').hide();
	// $('#deleteEnCS').hide();

})

function addnFamIEC(){

	if($('#addfamNinsideECprov').val() == "" || $('#addfamNinsideECcity').val() == "" || $('#ecnfamcum').val() == "" || $('#ecnpercum').val() == "" || $('#ecnbrgy').val() == ""){

		msgbox("Kindly fill, province, municipality, affected families and affected persons to continue!");

	}else{

		var datas = {

			provinceid 			: $('#addfamNinsideECprov').val(),
			municipality_id 	: $('#addfamNinsideECcity').val(),
			fam_no 				: $('#ecnfamcum').val(),
			person_no 			: $('#ecnpercum').val(),
			disaster_title_id 	: URLID(),
			brgy_affected  		: $('#ecnbrgy').val()
 
		};

		$.getJSON("/Pages/save_affected",datas,function(a){

			if(a == 1){

				$.confirm({
				    title: '<span class="green">Success</span>',
				    content: 'Data sucessfully saved!',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Yes',
				    		btnClass: 'btn-success',
				    		keys: ['enter'],
				    		action: function(){

				    			$('#addfamNinsideECprov').val("");
								$('#addfamNinsideECcity').val("");
								$('#ecnfamcum').val("");
								$('#ecnpercum').val("");

								$('#addfamnInside').modal('hide');

								get_dromic(URLID());

				            }
				    	}
				    }
				});


			}else if(a == 2){

				$.confirm({
				    title: '<span class="red">Warning</span>',
				    content: 'Municipality already exist! Do you want to update existing data?',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Yes',
				    		btnClass: 'btn-danger',
				    		keys: ['enter'],
				    		action: function(){

				    			$.getJSON("/Pages/save_affected2",datas,function(a){

				    				$.confirm({
									    title: '<span class="green">Success</span>',
									    content: 'Data sucessfully saved!',
									    buttons: {
									    	confirmAction: {
									    		text: '<i class="fa fa-check"></i> Yes',
									    		btnClass: 'btn-success',
									    		keys: ['enter'],
									    		action: function(){

									    			$('#addfamNinsideECprov').val("");
													$('#addfamNinsideECcity').val("");
													$('#ecnfamcum').val("");
													$('#ecnpercum').val("");

													$('#addfamnInside').modal('hide');

													get_dromic(URLID());

									            }
									    	}
									    }
									});

				    			});
				            }
				    	},cancelAction: {
				    		text: '<i class="fa fa-times-circle"></i> Cancel',
				    		btnClass: 'btn-blue'
				    	}
				    }
				});

			}else{

				alertError();

			}

		});

	}

}

function addnFamAECS(){

	if($('#addfamNinsideECprov').val() == "" || $('#addfamNinsideECcity').val() == "" || $('#ecnfamcum').val() == "" || $('#ecnpercum').val() == "" || $('#ecnbrgy').val() == ""){

		msgbox("Kindly fill, province, municipality, affected families and affected persons to continue!");

	}else{

		var datas = {

			provinceid 			: $('#addfamNinsideECprov').val(),
			municipality_id 	: $('#addfamNinsideECcity').val(),
			fam_no 				: $('#ecnfamcum').val(),
			person_no 			: $('#ecnpercum').val(),
			disaster_title_id 	: URLID(),
			brgy_affected  		: $('#ecnbrgy').val()
 
		};

		$.getJSON("/Pages/save_affected",datas,function(a){

			if(a == 1){

				$.confirm({
				    title: '<span class="green">Success</span>',
				    content: 'Data sucessfully saved!',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Yes',
				    		btnClass: 'btn-success',
				    		keys: ['enter'],
				    		action: function(){

				    			$('#addfamNinsideECprov').val("");
								$('#addfamNinsideECcity').val("");
								$('#ecnfamcum').val("");
								$('#ecnpercum').val("");
								$('#ecnbrgy').val("");

								get_dromic(URLID());

				            }
				    	}
				    }
				});


			}else if(a == 2){

				$.confirm({
				    title: '<span class="red">Warning</span>',
				    content: 'Municipality already exist! Do you want to update existing data?',
				    buttons: {
				    	confirmAction: {
				    		text: '<i class="fa fa-check"></i> Yes',
				    		btnClass: 'btn-danger',
				    		keys: ['enter'],
				    		action: function(){

				    			$.getJSON("/Pages/save_affected2",datas,function(a){

				    				$.confirm({
									    title: '<span class="green">Success</span>',
									    content: 'Data sucessfully saved!',
									    buttons: {
									    	confirmAction: {
									    		text: '<i class="fa fa-check"></i> Yes',
									    		btnClass: 'btn-success',
									    		keys: ['enter'],
									    		action: function(){

									    			$('#addfamNinsideECprov').val("");
													$('#addfamNinsideECcity').val("");
													$('#ecnfamcum').val("");
													$('#ecnpercum').val("");

													get_dromic(URLID());

									            }
									    	}
									    }
									});

				    			});
				            }
				    	},cancelAction: {
				    		text: '<i class="fa fa-times-circle"></i> Cancel',
				    		btnClass: 'btn-blue'
				    	}
				    }
				});

			}else{

				alertError();

			}

		});

	}

}

//-------------------Sex and Age Data ----------------------------------

$('#addsexage').click(function(){

	$('#addSexAgeDataModal').modal('show');
	$('#deleteSexAgeDate').hide();

	$('#provinceSexAge').val('');
	$('#citySexAge').val('');

	$('#infant_male_cum').val('');
	$('#infant_male_now').val('');
	$('#infant_female_cum').val('');
	$('#infant_female_now').val('');
	$('#toddlers_male_cum').val('');
	$('#toddlers_male_now').val('');
	$('#toddlers_female_cum').val('');
	$('#toddlers_female_now').val('');
	$('#preschoolers_male_cum').val('');
	$('#preschoolers_male_now').val('');
	$('#preschoolers_female_cum').val('');
	$('#preschoolers_female_now').val('');
	$('#schoolage_male_cum').val('');
	$('#schoolage_male_now').val('');
	$('#schoolage_female_cum').val('');
	$('#schoolage_female_now').val('');
	$('#teenage_male_cum').val('');
	$('#teenage_male_now').val('');
	$('#teenage_female_cum').val('');
	$('#teenage_female_now').val('');
	$('#adult_male_cum').val('');
	$('#adult_male_now').val('');
	$('#adult_female_cum').val('');
	$('#adult_female_now').val('');
	$('#senior_male_cum').val('');
	$('#senior_male_now').val('');
	$('#senior_female_cum').val('');
	$('#senior_female_now').val('');
	$('#pregnant_cum').val('');
	$('#pregnant_now').val('');
	$('#lactating_mother_cum').val('');
	$('#lactating_mother_now').val('');
	$('#unaccompanied_minor_male_cum').val('');
	$('#unaccompanied_minor_male_now').val('');
	$('#unaccompanied_minor_female_cum').val('');
	$('#unaccompanied_minor_female_now').val('');
	$('#pwd_male_cum').val('');
	$('#pwd_male_now').val('');
	$('#pwd_female_cum').val('');
	$('#pwd_female_now').val('');
	$('#solo_parent_male_cum').val('');
	$('#solo_parent_male_now').val('');
	$('#solo_parent_female_cum').val('');
	$('#solo_parent_female_now').val('');
	$('#ip_male_cum').val('');
	$('#ip_male_now').val('');
	$('#ip_female_cum').val('');
	$('#ip_female_now').val('');

})

var updateSexAgeData = (data) => {

	if($('#can_edit').text() == 'f'){
		msgbox("You're not allowed to edit this entry. Kindly contact the administrator for this privilege.");
	}else{

		var data = {
			id : data
		}

		$('#addSexAgeDataModal').modal('show');
		$('#deleteSexAgeDate').show();

		$.getJSON("/Pages/searchSexAgeData",data,function(a){

			$('#provinceSexAge').val(a[0].province_id);

			$.getJSON("/Pages/get_municipality",function(city){  
			    for(var i in city){
			    	if(a[0].province_id == city[i].provinceid){
			    		$('#citySexAge').append(
					        "<option value='"+city[i].id+"'>"+city[i].municipality_name+"</option>"
					    )
			    	}
			    }
			    $('#citySexAge').val(a[0].municipality_id);
			});

			$('#infant_male_cum').val(a[0].infant_male_cum);
			$('#infant_male_now').val(a[0].infant_male_now);
			$('#infant_female_cum').val(a[0].infant_female_cum);
			$('#infant_female_now').val(a[0].infant_female_now);
			$('#toddlers_male_cum').val(a[0].toddlers_male_cum);
			$('#toddlers_male_now').val(a[0].toddlers_male_now);
			$('#toddlers_female_cum').val(a[0].toddlers_female_cum);
			$('#toddlers_female_now').val(a[0].toddlers_female_now);
			$('#preschoolers_male_cum').val(a[0].preschoolers_male_cum);
			$('#preschoolers_male_now').val(a[0].preschoolers_male_now);
			$('#preschoolers_female_cum').val(a[0].preschoolers_female_cum);
			$('#preschoolers_female_now').val(a[0].preschoolers_female_now);
			$('#schoolage_male_cum').val(a[0].schoolage_male_cum);
			$('#schoolage_male_now').val(a[0].schoolage_male_now);
			$('#schoolage_female_cum').val(a[0].schoolage_female_cum);
			$('#schoolage_female_now').val(a[0].schoolage_female_now);
			$('#teenage_male_cum').val(a[0].teenage_male_cum);
			$('#teenage_male_now').val(a[0].teenage_male_now);
			$('#teenage_female_cum').val(a[0].teenage_female_cum);
			$('#teenage_female_now').val(a[0].teenage_female_now);
			$('#adult_male_cum').val(a[0].adult_male_cum);
			$('#adult_male_now').val(a[0].adult_male_now);
			$('#adult_female_cum').val(a[0].adult_female_cum);
			$('#adult_female_now').val(a[0].adult_female_now);
			$('#senior_male_cum').val(a[0].senior_male_cum);
			$('#senior_male_now').val(a[0].senior_male_now);
			$('#senior_female_cum').val(a[0].senior_female_cum);
			$('#senior_female_now').val(a[0].senior_female_now);
			$('#pregnant_cum').val(a[0].pregnant_cum);
			$('#pregnant_now').val(a[0].pregnant_now);
			$('#lactating_mother_cum').val(a[0].lactating_mother_cum);
			$('#lactating_mother_now').val(a[0].lactating_mother_now);
			$('#unaccompanied_minor_male_cum').val(a[0].unaccompanied_minor_male_cum);
			$('#unaccompanied_minor_male_now').val(a[0].unaccompanied_minor_male_now);
			$('#unaccompanied_minor_female_cum').val(a[0].unaccompanied_minor_female_cum);
			$('#unaccompanied_minor_female_now').val(a[0].unaccompanied_minor_female_now);
			$('#pwd_male_cum').val(a[0].pwd_male_cum);
			$('#pwd_male_now').val(a[0].pwd_male_now);
			$('#pwd_female_cum').val(a[0].pwd_female_cum);
			$('#pwd_female_now').val(a[0].pwd_female_now);
			$('#solo_parent_male_cum').val(a[0].solo_parent_male_cum);
			$('#solo_parent_male_now').val(a[0].solo_parent_male_now);
			$('#solo_parent_female_cum').val(a[0].solo_parent_female_cum);
			$('#solo_parent_female_now').val(a[0].solo_parent_female_now);
			$('#ip_male_cum').val(a[0].ip_male_cum);
			$('#ip_male_now').val(a[0].ip_male_now);
			$('#ip_female_cum').val(a[0].ip_female_cum);
			$('#ip_female_now').val(a[0].ip_female_now);
		});
	}
}

$('#deleteSexAgeDate').click(function(){

	var data = {
		municipality_id 				: $('#citySexAge').val(),
		disaster_title_id				: URLID()
	};

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Do you wish to delete this data, this may cause discrepancy from the previous report. Action cannot be undone.',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			$.getJSON("/Pages/deleteSexAgeData",data,function(a){
	    				if(a === '1' || a === 1){
	    					alerts();
							$('#addSexAgeDataModal').modal('hide');
							get_dromic(URLID());
	    				}
					});
	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue',
	    		action: function(){
	    			$('#addSexAgeDataModal').modal('hide');
	            }
	    	}
	    }
	});

})

$('#saveSexAgeDate').click(function(){

	var provinceSexAge = $('#provinceSexAge').val();
	var citySexAge = $('#citySexAge').val();

	var infant_male_cum = $('#infant_male_cum').val();
	var infant_male_now = $('#infant_male_now').val();
	var infant_female_cum = $('#infant_female_cum').val();
	var infant_female_now = $('#infant_female_now').val();
	var toddlers_male_cum = $('#toddlers_male_cum').val();
	var toddlers_male_now = $('#toddlers_male_now').val();
	var toddlers_female_cum = $('#toddlers_female_cum').val();
	var toddlers_female_now = $('#toddlers_female_now').val();
	var preschoolers_male_cum = $('#preschoolers_male_cum').val();
	var preschoolers_male_now = $('#preschoolers_male_now').val();
	var preschoolers_female_cum = $('#preschoolers_female_cum').val();
	var preschoolers_female_now = $('#preschoolers_female_now').val();
	var schoolage_male_cum = $('#schoolage_male_cum').val();
	var schoolage_male_now = $('#schoolage_male_now').val();
	var schoolage_female_cum = $('#schoolage_female_cum').val();
	var schoolage_female_now = $('#schoolage_female_now').val();
	var teenage_male_cum = $('#teenage_male_cum').val();
	var teenage_male_now = $('#teenage_male_now').val();
	var teenage_female_cum = $('#teenage_female_cum').val();
	var teenage_female_now = $('#teenage_female_now').val();
	var adult_male_cum = $('#adult_male_cum').val();
	var adult_male_now = $('#adult_male_now').val();
	var adult_female_cum = $('#adult_female_cum').val();
	var adult_female_now = $('#adult_female_now').val();
	var senior_male_cum = $('#senior_male_cum').val();
	var senior_male_now = $('#senior_male_now').val();
	var senior_female_cum = $('#senior_female_cum').val();
	var senior_female_now = $('#senior_female_now').val();
	var pregnant_cum = $('#pregnant_cum').val();
	var pregnant_now = $('#pregnant_now').val();
	var lactating_mother_cum = $('#lactating_mother_cum').val();
	var lactating_mother_now = $('#lactating_mother_now').val();
	var unaccompanied_minor_male_cum = $('#unaccompanied_minor_male_cum').val();
	var unaccompanied_minor_male_now = $('#unaccompanied_minor_male_now').val();
	var unaccompanied_minor_female_cum = $('#unaccompanied_minor_female_cum').val();
	var unaccompanied_minor_female_now = $('#unaccompanied_minor_female_now').val();
	var pwd_male_cum = $('#pwd_male_cum').val();
	var pwd_male_now = $('#pwd_male_now').val();
	var pwd_female_cum = $('#pwd_female_cum').val();
	var pwd_female_now = $('#pwd_female_now').val();
	var solo_parent_male_cum = $('#solo_parent_male_cum').val();
	var solo_parent_male_now = $('#solo_parent_male_now').val();
	var solo_parent_female_cum = $('#solo_parent_female_cum').val();
	var solo_parent_female_now = $('#solo_parent_female_now').val();
	var ip_male_cum = $('#ip_male_cum').val();
	var ip_male_now = $('#ip_male_now').val();
	var ip_female_cum = $('#ip_female_cum').val();
	var ip_female_now = $('#ip_female_now').val();

	var data = {
		province_id 					: provinceSexAge,
		municipality_id 				: citySexAge,
		disaster_title_id				: URLID(),
		infant_male_cum 				: infant_male_cum,
		infant_male_now 				: infant_male_now,
		infant_female_cum 				: infant_female_cum,
		infant_female_now 				: infant_female_now,
		toddlers_male_cum 				: toddlers_male_cum,
		toddlers_male_now 				: toddlers_male_now,
		toddlers_female_cum 			: toddlers_female_cum,
		toddlers_female_now 			: toddlers_female_now,
		preschoolers_male_cum 			: preschoolers_male_cum,
		preschoolers_male_now 			: preschoolers_male_now,
		preschoolers_female_cum 		: preschoolers_female_cum,
		preschoolers_female_now 		: preschoolers_female_now,
		schoolage_male_cum 				: schoolage_male_cum,
		schoolage_male_now 				: schoolage_male_now,
		schoolage_female_cum 			: schoolage_female_cum,
		schoolage_female_now 			: schoolage_female_now,
		teenage_male_cum 				: teenage_male_cum,
		teenage_male_now 				: teenage_male_now,
		teenage_female_cum 				: teenage_female_cum,
		teenage_female_now 				: teenage_female_now,
		adult_male_cum 					: adult_male_cum,
		adult_male_now 					: adult_male_now,
		adult_female_cum 				: adult_female_cum,
		adult_female_now 				: adult_female_now,
		senior_male_cum 				: senior_male_cum,
		senior_male_now 				: senior_male_now,
		senior_female_cum 				: senior_female_cum,
		senior_female_now 				: senior_female_now,
		pregnant_cum 					: pregnant_cum,
		pregnant_now 					: pregnant_now,
		lactating_mother_cum 			: lactating_mother_cum,
		lactating_mother_now 			: lactating_mother_now,
		unaccompanied_minor_male_cum 	: unaccompanied_minor_male_cum,
		unaccompanied_minor_male_now 	: unaccompanied_minor_male_now,
		unaccompanied_minor_female_cum 	: unaccompanied_minor_female_cum,
		unaccompanied_minor_female_now 	: unaccompanied_minor_female_now,
		pwd_male_cum 					: pwd_male_cum,
		pwd_male_now 					: pwd_male_now,
		pwd_female_cum 					: pwd_female_cum,
		pwd_female_now 					: pwd_female_now,
		solo_parent_male_cum			: solo_parent_male_cum,
		solo_parent_male_now			: solo_parent_male_now,
		solo_parent_female_cum 			: solo_parent_female_cum,
		solo_parent_female_now 			: solo_parent_female_now,
		ip_male_cum 					: ip_male_cum,
		ip_male_now 					: ip_male_now,
		ip_female_cum 					: ip_female_cum,
		ip_female_now 					: ip_female_now
	}

	if(provinceSexAge === "" || citySexAge === ""){
		msgbox("Kindly select province and city/municipality to continue!");
	}else{
		if(infant_male_cum === "" && infant_male_now === "" && infant_female_cum === "" && infant_female_now === "" && toddlers_male_cum === "" && toddlers_male_now === "" && toddlers_female_cum === "" && toddlers_female_now === "" && preschoolers_male_cum === "" && preschoolers_male_now === "" && preschoolers_female_cum === "" && preschoolers_female_now === "" && schoolage_male_cum === "" && schoolage_male_now === "" && schoolage_female_cum === "" && schoolage_female_now === "" && teenage_male_cum === "" && teenage_male_now === "" && teenage_female_cum === "" && teenage_female_now === "" && senior_male_cum === "" && senior_male_now === "" && senior_female_cum === "" && senior_female_now === "" && pregnant_cum === "" && pregnant_now === "" && lactating_mother_cum === "" && lactating_mother_now === "" && unaccompanied_minor_male_cum === "" && unaccompanied_minor_male_now === "" && unaccompanied_minor_female_cum === "" && unaccompanied_minor_female_now === "" && pwd_male_cum === "" && pwd_male_now === "" && pwd_female_cum === "" && pwd_female_now === "" && solo_male_cum === "" && solo_male_now === "" && solo_female_cum === "" && solo_female_now === "" && ip_male_cum === "" && ip_male_now === "" && ip_female_cum === "" && ip_female_now === ""){

			msgbox("Kindly input data to continue!");

		}else{
			$.getJSON("/Pages/saveSexAgeData",data,function(a){
				if(a === '1' || a === 1){
					alerts();
					$('#addSexAgeDataModal').modal('hide');
					get_dromic(URLID());
				}else if(a === '2' || a === 2){

					$.confirm({
					    title: '<span class="red">Confirm Action!</span>',
					    content: 'Data for this municipality already exists, do you wish to continue?',
					    buttons: {
					    	confirmAction: {
					    		text: '<i class="fa fa-check"></i> Yes',
					    		btnClass: 'btn-red',
					    		action: function(){
					    			$.getJSON("/Pages/updateSexAgeData",data,function(a){
					    				if(a === '1' || a === 1){
					    					alerts();
											$('#addSexAgeDataModal').modal('hide');
											get_dromic(URLID());
					    				}
									});
					            }
					    	},
					    	cancelAction: {
					    		text: '<i class="fa fa-times-circle"></i> No',
					    		btnClass: 'btn-blue'
					    	}
					    }
					});

				}
			})
		}
	}

})

$(function() {
    $.contextMenu({
        selector: '.contextmenu_click', 
        callback: function(key, options) {

        	if(key == "cost"){

	            var str = options.$trigger[0].id;
	            str = str.split(".");
	            str = str[1];

	            if($('#can_edit').text() == 'f'){

					msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

				}else{

					$('#adddamageasst').modal("show");
					$('#upDamAss').show();
					$('#deleteDamAss').show();
					$('#saveDamAss').hide();

					var datas = {

		            	municipality_id : str,
		            	URLID 			: URLID()

		            }

					upDamAssid = [];

					$.getJSON("/Pages/getDamAssMain",datas,function(a){

						upDamAssid.push(a.rs[0].id);

						$('#addDamprov').val(a.city[0].provinceid);

						$('#addDamcity').empty().append(
							"<option value=''>-- Select City/Municipality --</option>"
						);
						for(var j in a.city){
							$('#addDamcity').append(
								"<option value='"+a.city[j].id+"'>"+a.city[j].municipality_name+"</option>"
							);
						}

						$('#addDamcity').val(a.rs[0].municipality_id);			
						$('#ntotally').val(a.rs[0].totally_damaged);
						$('#npartially').val(a.rs[0].partially_damaged);
						$('#ndead').val(a.rs[0].dead);
						$('#nmising').val(a.rs[0].missing);
						$('#ninjured').val(a.rs[0].injured);
						$('#ndswd').val(a.rs[0].dswd_asst);
						$('#nlgu').val(a.rs[0].lgu_asst);
						$('#nngo').val(a.rs[0].ngo_asst);

						$('#addDamprov').prop("disabled",1);
						$('#addDamcity').prop("disabled",1);

						if(typeof a.rs[0].id === "undefined" || a.rs[0].id == null){

							$('#upDamAss').hide();
							$('#deleteDamAss').hide();
							$('#saveDamAss').show();

						}

					});
				}

	        }else if(key == "all_affected"){

	        	var str = options.$trigger[0].id;
	            str = str.split(".");
	            str = str[1];

				if($('#can_edit').text() == 'f'){

					msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

				}else{

					$('#addfamnInside').modal("show");

					var datas = {

		            	municipality_id : str,
		            	URLID 			: URLID()

		            }

					$.getJSON("/Pages/getAllAffected",datas,function(a){

						$('#addfamNinsideECprov').val(a.city[0].provinceid);

						$('#addfamNinsideECcity').empty().append(
							"<option value=''>-- Select City/Municipality --</option>"
						);

						for(var j in a.city){
							$('#addfamNinsideECcity').append(
								"<option value='"+a.city[j].id+"'>"+a.city[j].municipality_name+"</option>"
							);
						}

						$('#addfamNinsideECcity').val(a.rs[0].municipality_id);
						$('#ecnbrgy').val(a.rs[0].brgy_affected);
						$('#ecnfamcum').val(a.rs[0].fam_no);
						$('#ecnpercum').val(a.rs[0].person_no);

					});
				}

	        }else if(key == "dswd_assistance"){

	        	var str = options.$trigger[0].id;
	            str = str.split(".");
	            str = str[1];

	            if($('#can_edit').text() == 'f'){

					msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

				}else{

					var datas = {

		            	municipality_id : str

		            }

					$.getJSON("/Pages/getmunicipality",datas,function(a){

						$('#provinceAssistance').val(a[0].provinceid);

						$('#cityAssistance').empty().append(
							"<option value=''>-- Select City/Municipality --</option>"
						);

						for(var j in a){
							$('#cityAssistance').append(
								"<option value='"+a[j].id+"'>"+a[j].municipality_name+"</option>"
							);
						}

						$('#cityAssistance').val(str);

						activaTab('assistance');

					});
				}
	        }else if(key == "house_damage"){

	        	var str = options.$trigger[0].id;
	            str = str.split(".");
	            str = str[1];

	            if($('#can_edit').text() == 'f'){

					msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

				}else{

					var datas = {

		            	municipality_id : str

		            }

					$.getJSON("/Pages/getmunicipality",datas,function(a){

						$('#province_dam_per_brgy').val(a[0].provinceid);

						$('#city_dam_per_brgy').empty().append(
							"<option value=''>-- Select City/Municipality --</option>"
						);

						for(var j in a){
							$('#city_dam_per_brgy').append(
								"<option value='"+a[j].id+"'>"+a[j].municipality_name+"</option>"
							);
						}

						$('#city_dam_per_brgy').val(str);

						activaTab('damagesperbrgy');

					});
				}

	        }

        },
        items: {
            "cost": {name: "Update Cost of Assistance Data (LGU)", icon: "fa-money"},
            "all_affected": {name: "Update Total Affected Families and Persons", icon: "fa-users"},
            "dswd_assistance": {name: "Add/Update DSWD Assistance Data", icon: "fa-heart"},
            "house_damage": {name: "Add/Update House Damages Data", icon: "fa-home"},
        }
    });

    $('.contextmenu_click').on('click', function(e){
        console.log('clicked', this);
    })

    $.contextMenu({
        selector: '.contextmenu_click_ec', 
        callback: function(key, options) {

        	if(key == "ec"){

	            var str = options.$trigger[0].classList[1];
	            str = str.split(".");
	            str = str[1];

	            if($('#can_edit').text() == 'f'){

					msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

				}else{
					updateEC(str);
				}

	        }

        },
        items: {
            "ec": {name: "Update Evacuation Center Data", icon: "fa-home"},
        }
    });

    $('.contextmenu_click_ec').on('click', function(e){
        console.log('clicked', this);
    }) 

    $.contextMenu({
        selector: '.contextmenu_click_ec_tab', 
        callback: function(key, options) {

        	if(key == "close_ec"){

	            var str = options.$trigger[0].classList[1];
	            str = str.split(".");
	            str = str[1];

	            if($('#can_edit').text() == 'f'){

					msgbox("You're not allowed to edit this entry. Kindly contact the administrator.");

				}else{
					closeAllECs(str);
				}

	        }

        },
        items: {
            "close_ec": {name: "Close all ECs in this city/municipality", icon: "fa-home"},
        }
    });

    $('.contextmenu_click_ec_tab').on('click', function(e){
        console.log('clicked', this);
    }) 

});

function closeAllECs(id){

	var data = {
		urlID 				: URLID(),
		municipality_id 	: id
	}

	$.confirm({
	    title: '<span class="red">Confirm Action!</span>',
	    content: 'Are you sure you want to close all ECs?',
	    buttons: {
	    	confirmAction: {
	    		text: '<i class="fa fa-check"></i> Yes',
	    		btnClass: 'btn-red',
	    		action: function(){
	    			
	    			$.getJSON("/Pages/closeAllECs",data,function(a){
	    				if(a === '1' || a === 1){
	    					get_dromic(URLID());
	    				}
					});

	            }
	    	},
	    	cancelAction: {
	    		text: '<i class="fa fa-times-circle"></i> No',
	    		btnClass: 'btn-blue'
	    	}
	    }
	});

}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function selectElementContents(el) {

	showToast();

	var body = document.body,
	  range, sel;
	if (document.createRange && window.getSelection) {
	  range = document.createRange();
	  sel = window.getSelection();
	  sel.removeAllRanges();
	  range.selectNodeContents(el);
	  sel.addRange(range);
	}
	document.execCommand("Copy");

}

showToast= () =>{
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}















	




