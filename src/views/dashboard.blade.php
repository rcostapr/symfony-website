<!doctype html>
<html lang="pt">

<head>
    <title>{{ $metatitle }}</title>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="{{ $metadescr }}" />

    <!-- Custom styles for this page -->
    <link href="/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <link href="/vendor/jqueryui/jquery-ui.min.css" rel="stylesheet" />
    <link href="/vendor/jqueryui/jquery-ui.theme.min.css" rel="stylesheet" />
    <link href="/vendor/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" />
    <link href="/vendor/select2/css/select2-bootstrap4.min.css" rel="stylesheet" />
    <link href="/vendor/dropzone/dropzone.min.css" rel="stylesheet" />
    <link href="/vendor/quill/quill.core.css" rel="stylesheet" />
    <link href="/vendor/quill/quill.bubble.css" rel="stylesheet" />
    <link href="/vendor/quill/quill.snow.css" rel="stylesheet" />
    <link href="/vendor/perfect-scrollbar/perfect-scrollbar.css" rel="stylesheet" />
    <link href="/vendor/katex/katex.min.css" rel="stylesheet" />
    <link href="/vendor/apex/apexcharts.css" rel="stylesheet" />


    <!-- Default styles for this template-->


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
    <script src="/vendor/jquery/jquery.min.js"></script>
    <script src="/vendor/jqueryui/jquery-ui.min.js"></script>
    <script src="/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

    <!-- Core plugin JavaScript-->
    <script src="/vendor/jquery-easing/jquery.easing.min.js"></script>

    <!-- Custom scripts for all pages-->

    <!-- CK Editor -->

    <!-- Page level plugins -->
    <script src="/vendor/toastr/toastr.min.js"></script>
    <script src="/vendor/sweetalert2/sweetalert2.all.min.js"></script>
    <script src="/vendor/select2/select2.full.min.js"></script>
    <script src="/vendor/chart.js/Chart.min.js"></script>
    <script src="/vendor/datatables/jquery.dataTables.min.js"></script>
    <script src="/vendor/datatables/dataTables.bootstrap4.min.js"></script>
    <script src="/vendor/dropzone/dropzone.min.js"></script>
    <script src="/vendor/quill/quill.min.js"></script>
    <script src="/vendor/perfect-scrollbar/perfect-scrollbar.min.js"></script>
    <script src="/vendor/katex/katex.min.js"></script>
    <script src="/vendor/apex/apexcharts.min.js"></script>

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
