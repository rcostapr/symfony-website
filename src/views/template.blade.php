<!doctype html>
<html lang="pt">

<head>
    <title>{{ $metatitle }}</title>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="{{ $metadescr }}" />

    <!-- Custom Vendor styles -->
    <link href="/css/vendor/blundle.min.css" rel="stylesheet" />

    <!-- Default styles for this template-->
    <link href="/css/style.min.css" rel="stylesheet" />

    <!-- Custom styles for this template-->
    @if (isset($customCss))
    @if (is_array($customCss))
    @foreach ($customCss as $css)
    <link rel="stylesheet" href="{{ $css }}">
    @endforeach
    @else
    <link rel="stylesheet" href="{{ $customCss }}">
    @endif
    @endif
</head>

<body class="animated" id="page-top">

    <!-- End of Brand Mobiles -->

    <!-- Page Wrapper -->
    <div id="wrapper">
        <!-- End of Sidebar -->

        <!-- Content Wrapper -->
        <div id="content-wrapper" class="d-flex flex-column">
            <!-- Main Content -->
            <div id="content">

                <!-- End of Topbar -->

                <!-- Begin Page Content -->
                <div class="container-fluid">
                    @yield('content')
                </div>
                <!-- /.container-fluid -->
            </div>
            <!-- End of Main Content -->

            <!-- Footer -->

            <!-- End of Footer -->
        </div>
        <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button-->
    <a class="scroll-to-top rounded" href="#page-top">
        <i class="fas fa-angle-up"></i>
    </a>

    @include('modal.admin')
    @include('modal.upload')

    <!-- Bootstrap core JavaScript-->
    <script src="/js/vendor/blundle.min.js"></script>
    <!-- Default Javascript template -->
    <script src="/js/library.min.js"></script>


    @if (isset($customScript))

    @if (is_array($customScript))

    @foreach ($customScript as $script)

    <script src="{{ $script }}"></script>

    @endforeach
    @else

    <script src="{{ $customScript }}"></script>

    @endif

    @endif

</body>

</html>
