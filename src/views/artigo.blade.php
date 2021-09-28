@extends('dashboard')
@section('title', $metatitle)
@section('description', $metadescr)
@section('content')
<!-- Page Heading -->
<div class="d-sm-flex align-items-center justify-content-between mb-4">
    <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>
</div>

<!-- Content container-fluid -->
<div class="container-fluid">
    <div class="card shadow mb-4">
        <div class="card-header py-3">
            <div class="container-fluid">
                <h6 class="m-0 font-weight-bold d-inline-block">{{ $page }}</h6>
                <div class="float-right">
                    <button class="btn btn-raw btn-raw-down btn-color btn-2x btn-rounded"></button>
                    <button id="btnMainContent" type="button" class="btn btn-sync p-1"></button>
                </div>
            </div>
        </div>
        <div class="card-body">
			<ul id="navigation">
				@foreach ($navigation as $item)
				<li>
					<a href="{{ $item["href"] }}">{{ $item["caption"] }}</a>
				</li>
				@endforeach
			</ul>
			<h1>{{ $page }}
				- App Store Commerce</h1>
			{{ $artigoid }}
			<div>
				<button  id="sendRequest" type="button" class="btn btn-success" data-artigoid="{{ $artigoid }}">Send</button>
			</div>
        </div>
    </div>
</div>
@endsection