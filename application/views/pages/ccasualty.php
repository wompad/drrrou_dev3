<table class="table table-responsive table-striped" id="tbl_ccasualty">
	<thead>
		<tr>
			<th>Disaster Name</th>
			<th>Province Name</th>
			<th>Municipality Name</th>
			<th>Lastname</th>
			<th>Firstname</th>
			<th>M.I.</th>
			<th>Age</th>
			<th>Gender</th>
			<th>Place of Origin</th>
			<th>Dead</th>
			<th>Missing</th>
			<th>Injured</th>
			<th>Remarks</th>
			<th>Captured Date</th>
			<th>Captured Time</th>
			<th>Sender</th>
			<th>Ref. Code</th>
		</tr>
	</thead>
	<tbody>
		<?php foreach($result as $r) : ?>
			<?php 
				if($r['rstatus'] == "NOT READ"){
					$style = "background-color: #D34F42; color:#fff";
				}else{
					$style = "";
				} 
			?>
			<tr style="<?php echo $style; ?>">
				<td><?php echo $r['disaster_name']; ?></td>
				<td><?php echo $r['province_name']; ?></td>
				<td><?php echo $r['municipality_name']; ?></td>
				<td><?php echo $r['lname']; ?></td>
				<td><?php echo $r['fname']; ?></td>
				<td><?php echo $r['mi']; ?></td>
				<td><?php echo $r['age']; ?></td>
				<td><?php echo $r['gender']; ?></td>
				<td><?php echo $r['brgyname']; ?></td>
				<td><?php echo $r['isdead']; ?></td>
				<td><?php echo $r['ismissing']; ?></td>
				<td><?php echo $r['isinjured']; ?></td>
				<td><?php echo $r['remarks']; ?></td>
				<td><?php echo $r['ddate']; ?></td>
				<td><?php echo $r['dtime']; ?></td>
				<td><?php echo $r['username']; ?></td>
				<td><?php echo $r['ref_code']; ?></td>
			</tr>
		<?php endforeach; ?>
	</tbody>
</table>