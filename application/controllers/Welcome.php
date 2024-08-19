<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function pcinec($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->cinec();

		$this->load->view('pages/'.$page,$data);

	}

	public function pcoutec($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->coutec();

		$this->load->view('pages/'.$page,$data);

	}

	public function pcdamass($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->cdamass();

		$this->load->view('pages/'.$page,$data);

	}

	public function pccasualty($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->ccasualty();

		$this->load->view('pages/'.$page,$data);

	}

	public function pcpics($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->cpics();

		$this->load->view('pages/'.$page,$data);

	}

	public function pcdamage($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->cdamage();

		$this->load->view('pages/'.$page,$data);

	}

	public function radarphp($page = 'home')
	{	

		$data['result'] = $this->Disaster_model->radarphp();

		$this->load->view('pages/'.$page,$data);

	}

	public function cinecnotif()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->cinecnotif(),JSON_NUMERIC_CHECK);
	}

	public function coutecnotif()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->coutecnotif(),JSON_NUMERIC_CHECK);
	}

	public function casualtynotif()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->casualtynotif(),JSON_NUMERIC_CHECK);
	}

	public function assistnotif()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->assistnotif(),JSON_NUMERIC_CHECK);
	}

	public function picnotif()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->picnotif(),JSON_NUMERIC_CHECK);
	}

	public function damagesnotif()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->damagesnotif(),JSON_NUMERIC_CHECK);
	}

	public function newMessage()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->newMessage(),JSON_NUMERIC_CHECK);
	}

	public function viewMessage()
	{	
		echo json_encode($data['result'] = $this->Disaster_model->viewMessage(),JSON_NUMERIC_CHECK);
	}

}
