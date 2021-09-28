<!DOCTYPE html>
<html>

<head>
	<title>{{ $page }}
		- App Store Commerce</title>
</head>

<body>
	<ul id="navigation">
		@foreach ($navigation as $item)
		<li>
			<a href="{{ $item["href"] }}">{{ $item["caption"] }}</a>
		</li>
		@endforeach
	</ul>

	<h1>{{ $page }}
		- App Store Commerce</h1>
	{{ $a_variable }}
	<div>
		<button type="button" class="btn btn-sucess">Send</button>
	</div>
</body>

</html>