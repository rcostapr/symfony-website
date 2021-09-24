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
	</body>
</html>
