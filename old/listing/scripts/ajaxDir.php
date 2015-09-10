<?php

$globalblacklist = ["apachejunk","Thumbs.db"];

$base = "http://10.0.0.2";

if (isset($_GET["dir"])) {

	if (in_array($_GET["dir"], $globalblacklist)) { return; }

	$d = "../../".$_GET["dir"]."/";
	
	if (strpos($_GET["dir"], "..") !== false) { return; }
	
	if (is_dir($d)) {

		$dir = opendir($d);

		if ($dir) {
		
			$blacklist = [];
			if (file_exists($d."/.htaccess")) {
				$rows = file($d."/.htaccess");
				foreach ($rows as $rownum => $row) {
					if (strpos($row, "IndexIgnore") !== false) {
						$blacklist = explode(" ", str_replace("/", "", $row));
					}
				}
				$blacklist[count($blacklist)-1] = substr($blacklist[count($blacklist)-1], 0, strlen($blacklist[count($blacklist)-1])-2);
			}
			$blacklist[0] = ".htaccess"; $blacklist[] = "."; $blacklist[] = "..";
		
			$files = array();
		
			while (($file = readdir($dir)) !== false) {
				if (!in_array($file, $blacklist) && !in_array($file, $globalblacklist)) { $files[] = $file; }
			}
			
			usort($files, "filesort");
			
			echo "<table>";
			
			echo "<tr><td><div class = 'updimg'></div></td><td>".returnParentDir($d)."</td></tr>";
			
			foreach($files as $file) {
				
				echo "<tr><td class = 'icon'>";
			
				$type = @filetype($d.$file);
			
				if ($type == "dir") {
				
					echo "<div class = 'dirimg'></div></td><td>".returnFileLink($file, true)."</td><td>";
				
				}
				else if ($type == "file") {
				
					$spec = returnFileType($file);
				
					echo "<div class = '".$spec."img'></div></td><td>".returnFileLink($file, false)."</td><td class = 'size'>".returnFileSize($file);
				
				}
				
				echo "</td></tr>";
			
			}
			
			echo "</table>";
		
		}
		
		closedir($dir);
	
	} else { echo "No such dir $d"; }
	
}

function returnFileType($file) {

	$ext = strtolower(substr($file, strrpos($file, "."), strlen(utf8_decode($file))));

	$aud = [".mp3", ".avi", ".mp4"];
	$img = [".gif", ".png", ".bmp", ".jpg", ".jpeg"];
	$arc = [".rar", ".zip", ".7z"];
	$txt = [".txt", ".rtf", ".ini", ".css", ".js"];
	$web = [".html", ".shtml", ".php"];
	
	$spec = "file";
	
	if (in_array($ext, $aud)) { $spec = "aud"; }
	if (in_array($ext, $img)) { $spec = "img"; }
	if (in_array($ext, $arc)) { $spec = "arc"; }
	if (in_array($ext, $txt)) { $spec = "txt"; }
	if (in_array($ext, $web)) { $spec = "web"; }
	if ($ext == ".exe") { $spec = "exe"; }
	if ($ext == ".pdf") { $spec = "pdf"; }
	
	return $spec;
	
}

function returnFileSize($file) {

	global $base;
	
	$units = ["B", "KB", "MB", "GB"];
	
	$size = filesize("../../".$_GET["dir"]."/".$file);
	
	$i = 0;
	
	while ($size > 1024) {
	
		$size = $size/1024;
		$i++;
	
	}
	
	return round($size, 2)." ".$units[$i];

}

function returnParentDir($dir) {

	global $base;

	$dir = str_replace("../", "", $dir);
	
	$p = strrpos($dir, "/");
	
	while ($p == strlen(utf8_decode($dir))-1) {
	
		$dir = substr($dir, 0, strlen(utf8_decode($dir))-1);
		$p = strrpos($dir, "/");
	
	}
	
	$dir = substr($dir, 0, $p);
	
	$s = "<span class = 'dir' href = '$dir'>..</span>";
	
	return $s;

}

function returnFileLink($file, $d) {

	global $base;

	if ($d) {
	
		$s = "<span class = 'dir' href = '".$_GET["dir"]."/".$file."'>".$file."</span>";
	
		return $s;
	
	} else {
	
		$s = "<span class = 'link' href = '".$base.$_GET["dir"]."/".$file."'>".$file."</span>";
	
		return $s;
	
	}

}

function filesort($a, $b) {

	$at = @filetype("../../".$_GET["dir"]."/".$a);
	$bt = @filetype("../../".$_GET["dir"]."/".$b);

	if ($at == $bt) {
	
		return strnatcasecmp($a, $b);
	
	} else {
	
		if ($at == "dir") { return -1; } else { return 1; }
	
	}
	
}

?>