<?php

require 'Slim/Slim.php';

$app = new Slim();

$app->get('/vessels', 'getVessels');
$app->get('/vessels/:id',	'getVessel');
$app->post('/vessels', 'addVessels');
$app->put('/vessels/:id', 'updateVessels');
$app->delete('/vessels/:id',	'deleteVessels');
$app->get('/vessels/search/:query', 'findByNameVessels');


$app->get('/seamans', 'getSeamans');
$app->get('/seamans/:id',	'getSeaman');
$app->post('/seamans', 'addSeaman');
$app->put('/seamans/:id', 'updateSeaman');
$app->delete('/seamans/:id',	'deleteSeaman');
$app->get('/seamans/search/:query', 'findByNameSeaman');

$app->get('/vacancies', 	'getVacancies');
$app->get('/vacancies/:id',	'getVacancies');

$app->get('/companies', 	'getCompanies');
$app->get('/companies/:id',	'getCompanies');

$app->get('/vessels', 		'getVessels');
$app->get('/vessels/:id',	'getVessel');


$app->get('/wines', 'getWines');
$app->get('/wines/:id',	'getWine');
$app->get('/wines/search/:query', 'findByName');
$app->post('/wines', 'addWine');
$app->put('/wines/:id', 'updateWine');
$app->delete('/wines/:id',	'deleteWine');

$app->run();



function getCompanies($id = false) {
	if ($id === false) {
		$sql = "select * FROM companies ORDER BY id";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);  
			$companies = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			// echo '{"wine": ' . json_encode($wines) . '}';
			echo json_encode($companies);
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}elseif ($id) {
		$sql = "SELECT * FROM companies WHERE id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);  
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$companies = $stmt->fetchObject();  
			$db = null;
			echo json_encode($companies); 
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}else{
		echo '{"error":{"text": "что то не так )"}}';
	}
}

function getVacancies($id = false) {
	if ($id === false) {
		$sql = "select * FROM vacancies ORDER BY id";
		try {
			$db = getConnection();
			$stmt = $db->query($sql);  
			$vacancies = $stmt->fetchAll(PDO::FETCH_OBJ);
			$db = null;
			// echo '{"wine": ' . json_encode($wines) . '}';
			echo json_encode($vacancies);
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}elseif ($id) {
		$sql = "SELECT * FROM vacancies WHERE id=:id";
		try {
			$db = getConnection();
			$stmt = $db->prepare($sql);  
			$stmt->bindParam("id", $id);
			$stmt->execute();
			$vacancies = $stmt->fetchObject();  
			$db = null;
			echo json_encode($vacancies); 
		} catch(PDOException $e) {
			echo '{"error":{"text":'. $e->getMessage() .'}}'; 
		}
	}else{
		echo '{"error":{"text": "что то не так )"}}';
	}
}

function getSeamans() {
	$sql = "select * FROM seamans ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$seamans = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($seamans);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function getSeaman($id) {
	$sql = "SELECT * FROM seamans WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$seaman = $stmt->fetchObject();  
		$db = null;
		echo json_encode($seaman); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addSeaman() {
	error_log('addVessel\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$vessel = json_decode($request->getBody());
	$sql = "INSERT INTO vessels (imo,dwt,engine,bhp,MMSI,Name,Built,Gross,Shiptype,Operator,Status,coment) VALUES ( :imo, :dwt, :engine, :bhp, :MMSI, :Name, :Built, :Gross, :Shiptype, :Operator, :Status, :coment)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("imo", $vessel->imo);
		$stmt->bindParam("dwt", $vessel->dwt);
		$stmt->bindParam("engine", $vessel->engine);
		$stmt->bindParam("bhp", $vessel->bhp);
		$stmt->bindParam("MMSI", $vessel->MMSI);
		$stmt->bindParam("Name", $vessel->Name);
		$stmt->bindParam("Gross", $vessel->Gross);
		$stmt->bindParam("Shiptype", $vessel->Shiptype);
		$stmt->bindParam("Operator", $vessel->Operator);
		$stmt->bindParam("Status", $vessel->Status);
		$stmt->bindParam("coment", $vessel->coment);
		$stmt->execute();
		$vessel->id = $db->lastInsertId();
		$db = null;
		echo json_encode($vessel); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateSeaman($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$vessel = json_decode($body);
	$sql = "UPDATE vessel SET  imo=:imo, dwt=:dwt, engine=:engine, bhp=:bhp, MMSI=:MMSI, Name=:Name, Built=:Built, Gross=:Gross, Shiptype=:Shiptype, Operator=:Operator, Status=:Status, coment=:coment WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("imo", $vessel->imo);
		$stmt->bindParam("dwt", $vessel->dwt);
		$stmt->bindParam("engine", $vessel->engine);
		$stmt->bindParam("bhp", $vessel->bhp);
		$stmt->bindParam("MMSI", $vessel->MMSI);
		$stmt->bindParam("Name", $vessel->Name);
		$stmt->bindParam("Gross", $vessel->Gross);
		$stmt->bindParam("Shiptype", $vessel->Shiptype);
		$stmt->bindParam("Operator", $vessel->Operator);
		$stmt->bindParam("Status", $vessel->Status);
		$stmt->bindParam("coment", $vessel->coment);
		$stmt->execute();
		$vessel->id = $db->lastInsertId();
		$db = null;
		echo json_encode($vessel); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteSeaman($id) {
	$sql = "DELETE FROM vessels WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByNameSeaman($query) {
	$sql = "SELECT * FROM vessels WHERE UPPER(Name) LIKE :query ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$vessel = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($vessel);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
///////////////////////////////////////////////////////////////




function getVessels() {
	$sql = "select * FROM vessels ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$vessels = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($vessels);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}


function getVessel($id) {
	$sql = "SELECT * FROM vessels WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$vessel = $stmt->fetchObject();  
		$db = null;
		echo json_encode($vessel); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addVessels() {
	error_log('addVessel\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$vessel = json_decode($request->getBody());
	$sql = "INSERT INTO vessels (imo,dwt,engine,bhp,MMSI,Name,Built,Gross,Shiptype,Operator,Status,coment) VALUES ( :imo, :dwt, :engine, :bhp, :MMSI, :Name, :Built, :Gross, :Shiptype, :Operator, :Status, :coment)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("imo", $vessel->imo);
		$stmt->bindParam("dwt", $vessel->dwt);
		$stmt->bindParam("engine", $vessel->engine);
		$stmt->bindParam("bhp", $vessel->bhp);
		$stmt->bindParam("MMSI", $vessel->MMSI);
		$stmt->bindParam("Name", $vessel->Name);
		$stmt->bindParam("Gross", $vessel->Gross);
		$stmt->bindParam("Shiptype", $vessel->Shiptype);
		$stmt->bindParam("Operator", $vessel->Operator);
		$stmt->bindParam("Status", $vessel->Status);
		$stmt->bindParam("coment", $vessel->coment);
		$stmt->execute();
		$vessel->id = $db->lastInsertId();
		$db = null;
		echo json_encode($vessel); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateVessels($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$vessel = json_decode($body);
	$sql = "UPDATE vessel SET  imo=:imo, dwt=:dwt, engine=:engine, bhp=:bhp, MMSI=:MMSI, Name=:Name, Built=:Built, Gross=:Gross, Shiptype=:Shiptype, Operator=:Operator, Status=:Status, coment=:coment WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("imo", $vessel->imo);
		$stmt->bindParam("dwt", $vessel->dwt);
		$stmt->bindParam("engine", $vessel->engine);
		$stmt->bindParam("bhp", $vessel->bhp);
		$stmt->bindParam("MMSI", $vessel->MMSI);
		$stmt->bindParam("Name", $vessel->Name);
		$stmt->bindParam("Gross", $vessel->Gross);
		$stmt->bindParam("Shiptype", $vessel->Shiptype);
		$stmt->bindParam("Operator", $vessel->Operator);
		$stmt->bindParam("Status", $vessel->Status);
		$stmt->bindParam("coment", $vessel->coment);
		$stmt->execute();
		$vessel->id = $db->lastInsertId();
		$db = null;
		echo json_encode($vessel); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deliteVessels($id) {
	$sql = "DELETE FROM vessels WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByNameVessels($query) {
	$sql = "SELECT * FROM vessels WHERE UPPER(Name) LIKE :query ORDER BY id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$vessel = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($vessel);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}
//////////////////////////////// vessel /////////////////////////////////////
function getWines() {
	$sql = "select * FROM wine ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->query($sql);  
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		// echo '{"wine": ' . json_encode($wines) . '}';
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getWine($id) {
	$sql = "SELECT * FROM wine WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$wine = $stmt->fetchObject();  
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function addWine() {
	error_log('addWine\n', 3, '/var/tmp/php.log');
	$request = Slim::getInstance()->request();
	$wine = json_decode($request->getBody());
	$sql = "INSERT INTO wine (name, grapes, country, region, year, description, picture) VALUES (:name, :grapes, :country, :region, :year, :description, :picture)";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $wine->name);
		$stmt->bindParam("grapes", $wine->grapes);
		$stmt->bindParam("country", $wine->country);
		$stmt->bindParam("region", $wine->region);
		$stmt->bindParam("year", $wine->year);
		$stmt->bindParam("description", $wine->description);
		$stmt->bindParam("picture", $wine->picture);
		$stmt->execute();
		$wine->id = $db->lastInsertId();
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		error_log($e->getMessage(), 3, '/var/tmp/php.log');
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function updateWine($id) {
	$request = Slim::getInstance()->request();
	$body = $request->getBody();
	$wine = json_decode($body);
	$sql = "UPDATE wine SET name=:name, grapes=:grapes, country=:country, region=:region, year=:year, description=:description, picture=:picture WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("name", $wine->name);
		$stmt->bindParam("grapes", $wine->grapes);
		$stmt->bindParam("country", $wine->country);
		$stmt->bindParam("region", $wine->region);
		$stmt->bindParam("year", $wine->year);
		$stmt->bindParam("description", $wine->description);
		$stmt->bindParam("picture", $wine->picture);
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
		echo json_encode($wine); 
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function deleteWine($id) {
	$sql = "DELETE FROM wine WHERE id=:id";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);  
		$stmt->bindParam("id", $id);
		$stmt->execute();
		$db = null;
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function findByName($query) {
	$sql = "SELECT * FROM wine WHERE UPPER(name) LIKE :query ORDER BY name";
	try {
		$db = getConnection();
		$stmt = $db->prepare($sql);
		$query = "%".$query."%";  
		$stmt->bindParam("query", $query);
		$stmt->execute();
		$wines = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($wines);
	} catch(PDOException $e) {
		echo '{"error":{"text":'. $e->getMessage() .'}}'; 
	}
}

function getConnection() {
	$dbhost="localhost";
	$dbuser="crs_marine";
	$dbpass="bQPVv37xKavCqTfB";
	$dbname="cellar";
	$dbh = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);	
	$dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
	return $dbh;
}

?>